'use client'

import Link from 'next/link'
import { useCart } from '@/cart/CartContext'

export default function CartIndicator() {
  const { state } = useCart()
  const totalItems = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <Link href="/cart" className="cart-indicator">
      🛒
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>
      )}
    </Link>
  )
}