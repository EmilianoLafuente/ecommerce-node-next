'use client'

import { useCart } from '@/cart/CartContext'

export default function CartTotals() {
  const { state } = useCart()

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="cart-totals">
      <div className="cart-total-row">
        <span>Total</span>
        <strong>${total}</strong>
      </div>
    </div>
  )
}