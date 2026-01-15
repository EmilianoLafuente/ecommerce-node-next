'use client'

import { useCart } from '@/cart/CartContext'
import CartSummary from '@/components/CartSummary'

export default function CartPage() {
  const { state } = useCart()

  if (state.checkoutSuccess) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Carrito</h1>
        <p>✅ Compra realizada con éxito</p>
      </main>
    )
  }

  if (state.items.length === 0) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Carrito</h1>
        <p>El carrito está vacío.</p>
      </main>
    )
  }

  return (
    <main style={{ padding: '2rem' }}>
      <CartSummary />
    </main>
  )
}
