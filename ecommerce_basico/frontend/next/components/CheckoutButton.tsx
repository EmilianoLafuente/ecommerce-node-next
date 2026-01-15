'use client'

import { useState } from 'react'
import { useCart } from '@/cart/CartContext'
import { createOrder } from '@/services/orders.service'
import { useRouter } from 'next/navigation'

export default function CheckoutButton() {
  const { state, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

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
      router.push('/checkout/success')
    } catch (err: any) {
      setError('No se pudo completar la compra. Verificá el stock disponible.')
    } finally {
      setLoading(false)
    }
  }

    return (
      <>
        {error && (
          <div className="cart-error">
            {error}
          </div>
        )}

        <button
          className="checkout-button"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Confirmar compra'}
        </button>
      </>
    )
}
