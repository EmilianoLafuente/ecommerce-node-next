// 🧱 Qué ES una Orden

// Una orden es una foto final de una compra
// No cambia
// No se edita
// No depende del carrito después

// 📌 El carrito puede cambiar
// 📌 La orden no


// 🎯 Responsabilidades de Order
// ✅ ES

// entidad
// inmutable (conceptualmente)
// persistente

// ❌ NO
// no valida stock
// no modifica productos
// no sabe de servicios


// 🧩 Datos que debe tener una orden

// id
// items (snapshot del carrito)
// total
// status (confirmed, cancelled)
// createdAt

// 📌 Los items NO referencian Product, copian datos.

class Order {
  constructor({ id, items, total, status, createdAt, history }) {
    this.id = id
    this.items = items
    this.total = total

    this.status = status ?? 'pending'
    this.createdAt = createdAt ?? new Date().toISOString()

    // 🕒 historial de estados
    this.history = history ?? [
      {
        status: this.status,
        at: this.createdAt
      }
    ]
  }
}

export default Order