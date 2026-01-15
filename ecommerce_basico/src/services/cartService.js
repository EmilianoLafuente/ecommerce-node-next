// 🧠 Qué ES cartService (muy claro)

// Coordina productos + carrito
// Valida reglas de negocio
// Maneja asincronía
// Decide errores

// 📌 El carrito no valida stock
// 📌 El producto no sabe del carrito
// 📌 El service conecta todo


// 🎯 Responsabilidades de cartService.js

// Debe poder:

// Crear un carrito
// Agregar producto al carrito (validando stock)
// Quitar producto del carrito
// Actualizar cantidades (con validación)
// Obtener resumen del carrito

// ❌ Todavía:
// no confirmar orden
// no descontar stock definitivo
// no persistir carrito

import Cart from '../models/Cart.js'
import { getProductById } from './productService.js'

// Crear un carrito nuevo
export const createCart = () => {
  return new Cart()
}

// Agregar producto al carrito validando stock
export const addProductToCart = async (cart, productId, quantity = 1) => {
  const product = await getProductById(productId)

  if (!product.hasStock(quantity)) {
    throw new Error('Stock insuficiente para el producto')
  }

  cart.addProduct(product, quantity)
  return cart
}

// Quitar producto del carrito
export const removeProductFromCart = (cart, productId) => {
  cart.removeProduct(productId)
  return cart
}

// Actualizar cantidad de un producto
export const updateProductQuantity = async (cart, productId, quantity) => {
  if (quantity <= 0) {
    cart.removeProduct(productId)
    return cart
  }

  const product = await getProductById(productId)

  if (!product.hasStock(quantity)) {
    throw new Error('Stock insuficiente para la cantidad solicitada')
  }

  cart.updateQuantity(productId, quantity)
  return cart
}

// Obtener resumen del carrito
export const getCartSummary = (cart) => {
  return {
    items: cart.getItems().map(item => ({
      productId: item.product.id,
      description: item.product.getDescription(),
      price: item.product.price,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity
    })),
    total: cart.getTotal()
  }
}


// 🎯 Dónde estás parado ahora (muy importante)

// ✔ Productos persistidos
// ✔ Carrito funcional
// ✔ Service con reglas reales
// ✔ Asincronía correcta
// ✔ Arquitectura limpia

// 👉 Esto ya es un ecommerce backend real (sin HTTP).