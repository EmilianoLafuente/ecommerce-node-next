'use client'

import Container from '@/components/layout/Container'
import CartSummary from '@/components/CartSummary'
import CartTotals from '@/components/cart/CartTotals'
import CheckoutButton from '@/components/CheckoutButton'

export default function CartPage() {
  return (
    <Container>
      <h1 className="page-title">Carrito</h1>

      <div className="cart-layout">
        <div className="cart-items">
          <CartSummary />
        </div>

        <div className="cart-checkout">
          <h3>Resumen</h3>
          <CartTotals />
          <CheckoutButton />
        </div>
      </div>
    </Container>
  )
}