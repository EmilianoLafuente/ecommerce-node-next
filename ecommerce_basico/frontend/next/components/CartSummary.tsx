'use client'

import { useCart } from '@/cart/CartContext'

export default function CartSummary() {
  const {
    state,
    removeItem,
    updateQuantity,
    clearCart
  } = useCart()

  if (state.items.length === 0) {
    return <p>El carrito está vacío.</p>
  }

  return (
    <section>
      <ul>
        {state.items.map(item => (
          <li key={item.productId} className="cart-item">
            {item.image && (
              <img
                src={item.image}
                alt={`${item.brand} ${item.model}`}
              />
            )}

            <div className="cart-item-info">
              <strong>
                {item.brand} {item.model}
              </strong>

              <div className="cart-item-price">
                ${item.price}
              </div>

              <div className="cart-item-qty">
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
                />
              </div>

              <button
                className="cart-item-remove"
                onClick={() => removeItem(item.productId)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="cart-clear"
        onClick={clearCart}
      >
        Vaciar carrito
      </button>
    </section>
  )
}