/*
🧠 Qué es un service (en serio)

Un service contiene la lógica de negocio
que coordina modelos,
valida reglas
y maneja asincronía.

📌 El service usa Product, pero Product no sabe que existe el service.

🎯 Objetivo de productService.js

Simular:

una “base de datos” de productos

operaciones reales de un ecommerce
*/


import Product from '../models/Product.js'
import { resolvePath, readJSON, writeJSON } from '../utils/fileSystem.js'
import { validateProduct } from '../utils/validations.js'
import NotFoundError from '../errors/NotFoundError.js'
import ConflictError from '../errors/ConflictError.js'

// Funcion definida en fileSystem.js para rutas absolutas
const DB_PATH = resolvePath('../data/productsDB.json')

// Simula delay de DB
const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

// leer DB (ya devuelve array)
const readDB = async () => {
  await delay(200)
  return await readJSON(DB_PATH)
}

// escribir DB
const writeDB = async (data) => {
  await delay(200)
  await writeJSON(DB_PATH, data)
}

// obtener todos los productos activos para cliente front
export const getAllProducts = async () => {
  const data = await readDB()
  //Para validar que no existan productos con stock 0
  let changed = false

  data.forEach(p => {
    if (p.stock === 0 && p.active === true) {
      p.active = false
      changed = true
    }
  })

  if (changed) {
    await writeJSON(DB_PATH, data)
  }

  return data
    .filter(p => p.active)
    .map(p => new Product(p))
}

// ADMIN: muestra TODOS los productos
export const getAllProductsAdmin = async () => {
  const data = await readDB()

  // normalización (la mantenemos acá también)
  let changed = false
  data.forEach(p => {
    if (p.stock === 0 && p.active === true) {
      p.active = false
      changed = true
    }
  })

  if (changed) {
    await writeJSON(DB_PATH, data)
  }

  return data.map(p => new Product(p))
}

// ADMIN: Aumentar stock 
export const increaseStock = async (id, quantity) => {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error('Cantidad inválida')
  }

  const data = await readDB()

  const index = data.findIndex(p => p.id === id)
  if (index === -1) {
    throw new Error('Producto no encontrado')
  }

  data[index].stock += quantity

  // ⭐ regla de negocio
  if (data[index].stock > 0) {
    data[index].active = true
  }

  await writeJSON(DB_PATH, data)

  return new Product(data[index])
}

// ADMIN: Restaura stock si la orden pasa de pending a cancelled
export const restoreStock = async (id, quantity) => {
  const data = await readDB()

  const index = data.findIndex(p => p.id === id)
  if (index === -1) {
    throw new Error('Producto no encontrado')
  }

  data[index].stock += quantity

  // regla: si vuelve a tener stock, se reactiva
  if (data[index].stock > 0) {
    data[index].active = true
  }

  await writeJSON(DB_PATH, data)
}

// buscar producto por ID
export const getProductById = async (id) => {
  const data = await readDB()

  const product = data.find(p => String(p.id) === String(id) && p.active)

if (!product) {
  throw new NotFoundError('Producto no encontrado')
}

  return new Product(product)
}

// agregar producto
export const addProduct = async (productData) => {
  const errors = validateProduct(productData)
  if (errors.length) {
    throw new Error(errors.join(', '))
  }

  const data = await readDB()

  const newProduct = new Product({
    id: Date.now(),
    ...productData
  })

  data.push(newProduct)
  await writeDB(data)

  return newProduct
}

// Reduce Stock
export const reduceStock = async (id, quantity) => {
  const data = await readJSON(DB_PATH)

  const index = data.findIndex(p => p.id === id && p.active)
  if (index === -1) {
    throw new Error('Producto no encontrado')
  }

  if (data[index].stock < quantity) {
    throw new ConflictError('Stock insuficiente')
  }

  data[index].stock -= quantity

    // ⭐ regla de negocio
  if (data[index].stock === 0) {
    data[index].active = false
  }

  await writeJSON(DB_PATH, data)

  return new Product(data[index])
}

// Actualizar producto (ADMIN)
export const updateProduct = async (id, updates) => {
  const data = await readDB()

  const index = data.findIndex(p => p.id === id && p.active)
  if (index === -1) {
    throw new Error('Producto no encontrado')
  }

  // 1️⃣ Producto final (original + cambios)
  const updatedProduct = {
    ...data[index],
    ...updates
  }

  // 2️⃣ Validar producto COMPLETO
  const errors = validateProduct(updatedProduct)
  if (errors.length) {
    throw new Error(errors.join(', '))
  }

  // 3️⃣ Guardar
  data[index] = updatedProduct
  await writeJSON(DB_PATH, data)

  return new Product(updatedProduct)
}

// Borrado lógico
export const deleteProduct = async (id) => {
  const data = await readDB()

  const product = data.find(p => p.id === id && p.active)
  if (!product) {
    throw new Error('Producto no encontrado')
  }

  product.active = false
  await writeJSON(DB_PATH, data)

  return true
}