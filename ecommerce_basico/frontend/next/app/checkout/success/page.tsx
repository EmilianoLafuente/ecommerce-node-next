import Container from '@/components/layout/Container'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <Container>
      <div className="checkout-success">
        <h1>¡Compra confirmada! 🎉</h1>

        <p>
          Tu pedido fue procesado correctamente.
          En breve recibirás más información.
        </p>

        <div className="checkout-success-actions">
          <Link href="/" className="checkout-link">
            Volver a la tienda
          </Link>
        </div>
      </div>
    </Container>
  )
}