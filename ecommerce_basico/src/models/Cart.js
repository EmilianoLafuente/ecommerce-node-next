// 🧱 Cart.js como contrato (resumen)
// Cart
//  ├── items[]
//  ├── addProduct()
//  ├── removeProduct()
//  ├── updateQuantity()
//  ├── getTotal()
//  ├── getItems()
//  └── clear()

class Cart {
  constructor() {
    this.items = []
    this.createdAt = new Date()
  }

  // Agrega un producto al carrito
  addProduct(product, quantity = 1) {
    const existingItem = this.items.find(
      item => item.product.id === product.id
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push({
        product,
        quantity
      })
    }
  }

  // Elimina un producto del carrito por ID
  removeProduct(productId) {
    this.items = this.items.filter(
      item => item.product.id !== productId
    )
  }

  // Actualiza la cantidad de un producto
  updateQuantity(productId, quantity) {
    const item = this.items.find(
      item => item.product.id === productId
    )

    if (!item) return

    if (quantity <= 0) {
      this.removeProduct(productId)
    } else {
      item.quantity = quantity
    }
  }

  // Devuelve el total del carrito
  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  }

  // Devuelve los items del carrito
  getItems() {
    return this.items
  }

  // Vacía el carrito
  clear() {
    this.items = []
  }
}

export default Cart


// 🧠 Por qué este código está bien (clave)

// ✔ No usa async / await (no le corresponde)

// ✔ No valida stock (eso es service)

// ✔ No toca archivos

// ✔ No conoce productService

// ✔ Estado encapsulado

// Esto es una entidad pura.