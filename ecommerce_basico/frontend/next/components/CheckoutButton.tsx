'use client'

import { useState } from 'react'
import { useCart } from '@/cart/CartContext'
import { createOrder } from '@/services/orders.service'

export default function CheckoutButton() {
  const { state, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      const payload = {
        items: state.items.map(item => ({
        id: item.productId,     // 👈 CLAVE
        quantity: item.quantity
        }))
      }

      console.log('Checkout payload:', payload)
      await createOrder(payload)

      // 🔥 BORRAR PERSISTENCIA
      localStorage.removeItem('cart')

      clearCart()
      setSuccess(true)
    } catch (err: any) {
      setError('No se pudo completar la compra. Verificá stock.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading || state.items.length === 0}
      >
        {loading ? 'Procesando...' : 'Confirmar compra'}
      </button>
    </div>
  )
}
