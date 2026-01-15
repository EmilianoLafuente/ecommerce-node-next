'use client'

import { useState } from 'react'
import { useCart } from '@/cart/CartContext'
import { CartItem } from '@/cart/cart.types'

type Props = {
  item: CartItem
  maxStock: number
}

export default function AddToCartButton({ item, maxStock }: Props) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => {
    if (quantity <= 0) return
    if (quantity > maxStock) return

    addItem({
      ...item,
      quantity
    })
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <label>
        Cantidad:{' '}
        <input
          type="number"
          min={1}
          max={maxStock}
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          style={{ width: '60px', marginRight: '0.5rem' }}
        />
      </label>

      <button onClick={handleAdd}>
        Agregar al carrito
      </button>
    </div>
  )
}