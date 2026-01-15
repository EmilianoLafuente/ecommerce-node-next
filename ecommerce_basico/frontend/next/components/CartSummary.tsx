'use client'

import { useCart } from '@/cart/CartContext'
import CheckoutButton from '@/components/CheckoutButton'


export default function CartSummary() {
  const {
    state,
    removeItem,
    updateQuantity,
    clearCart
  } = useCart()

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (state.items.length === 0) {
    return <p>El carrito está vacío.</p>
  }

  return (
    <section>
      <h1>Carrito</h1>

      <ul>
        {state.items.map(item => (
          <li key={item.productId} style={{ marginBottom: '1rem' }}>
            <strong>
              {item.brand} {item.model}
            </strong>

            <div>
              Precio: ${item.price}
            </div>

            <div>
              Cantidad:{' '}
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={e =>
                  updateQuantity(
                    item.productId,
                    Number(e.target.value)
                  )
                }
                style={{ width: '60px' }}
              />
            </div>

            <button
              onClick={() => removeItem(item.productId)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>Total: ${total}</h2>

      <button onClick={clearCart}>
        Vaciar carrito
      </button>

      {/* Intenta crear orden y hace verificaciones */}
      <CheckoutButton />
    </section>
    
  )
}
