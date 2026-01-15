class Product {
  constructor({
    // Identidad
    id,
    brand,
    model,

    // Especificaciones
    width,
    profile,
    rim,

    // Negocio
    price,
    stock,
    active = true,

    // Multimedia
    images = []          // 👈 NUEVO
  }) {
    this.id = id
    this.brand = brand
    this.model = model
    this.width = width
    this.profile = profile
    this.rim = rim
    this.price = price
    this.stock = stock
    this.active = active
    this.images = images // 👈 NUEVO
  }

  // Devuelve una descripción legible del neumático
  getDescription() {
    return `${this.brand} ${this.model} ${this.width}/${this.profile} R${this.rim}`
  }

  // Verifica si hay stock suficiente
  hasStock(quantity = 1) {
    return this.stock >= quantity
  }

  // Reduce el stock si es posible
  reduceStock(quantity = 1) {
    if (!this.hasStock(quantity)) {
      throw new Error('Stock insuficiente para el producto')
    }
    this.stock -= quantity
  }

  // Aumenta el stock
  increaseStock(quantity = 1) {
    this.stock += quantity
  }
}

export default Product