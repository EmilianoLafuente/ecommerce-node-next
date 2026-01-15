import Order from '../models/Order.js'
import { getProductById, updateProduct, reduceStock, restoreStock  } from './productService.js'
import { resolvePath, readJSON, writeJSON } from '../utils/fileSystem.js'
import NotFoundError from '../errors/NotFoundError.js'
import BadRequestError from '../errors/BadRequestError.js'

const ORDERS_DB = resolvePath('../data/ordersDB.json')

//Funcion completa de orden compra para cliente 
export const confirmOrder = async (cart) => {
  if (!cart.length) {
    throw new Error('El carrito está vacío')
  }

  // 1️⃣ Validar stock
  for (const item of cart) {
    const product = await getProductById(item.id)

    if (product.stock < item.quantity) {
      throw new Error(`Stock insuficiente para ${product.brand} ${product.model}`)
    }
  }

  // 2️⃣ Descontar stock
  for (const item of cart) {
    const product = await getProductById(item.id)

    await reduceStock(item.id, item.quantity)
  }

  // 3️⃣ Crear orden
  // const order = new Order({
  //   id: Date.now(),
  //   status: 'pending', // 👈 CLAVE
  //   createdAt: new Date().toISOString(),
  //   items: cart.map(i => ({
  //     productId: i.id,
  //     description: `${i.brand} ${i.model}`,
  //     price: i.price,
  //     quantity: i.quantity
  //   })),
  //   total: cart.reduce((acc, i) => acc + i.price * i.quantity, 0)
  // })

  const itemsSnapshot = []

  for (const item of cart) {
    const product = await getProductById(item.id)

    itemsSnapshot.push({
      productId: product.id,
      description: product.getDescription(), // 👈 CLAVE
      price: product.price,                  // 👈 CLAVE
      quantity: item.quantity
    })
  }

  const order = new Order({
    id: Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    items: itemsSnapshot,
    total: itemsSnapshot.reduce(
      (acc, i) => acc + i.price * i.quantity,
      0
    )
  })

  // 4️⃣ Guardar orden
  const orders = await readJSON(ORDERS_DB)
  orders.push(order)
  await writeJSON(ORDERS_DB, orders)

  return order
}

//Funciones separadas para el Admin
export const getAllOrders = async () => {
  const orders = await readJSON(ORDERS_DB)
  return orders
}

export const getOrderById = async (id) => {
  const orders = await readJSON(ORDERS_DB)

  const order = orders.find(o => o.id === id)
  if (!order) {
    throw new NotFoundError('Orden no encontrada')
  }

  return order
}

export const updateOrderStatus = async (id, status) => {
  const orders = await readJSON(ORDERS_DB)

  const index = orders.findIndex(o => o.id === id)
  if (index === -1) {
    throw new NotFoundError('Orden no encontrada')
  }

  const order = orders[index]
  const currentStatus = order.status || 'pending'

  if (currentStatus !== 'pending') {
    throw new BadRequestError('La orden ya fue cerrada')
  }

  if (status === 'cancelled') {
    for (const item of order.items) {
      await restoreStock(item.productId, item.quantity)
    }
  }

  // 🔧 normalizar historial (órdenes viejas)
  if (!order.history) {
    order.history = [
      {
        status: order.status ?? 'pending',
        at: order.createdAt ?? new Date().toISOString()
      }
    ]
  }

  // 🔥 actualizar estado
  order.status = status

  // 🔥 registrar historial
  order.history.push({
    status,
    at: new Date().toISOString()
  })

  await writeJSON(ORDERS_DB, orders)

  return order
}