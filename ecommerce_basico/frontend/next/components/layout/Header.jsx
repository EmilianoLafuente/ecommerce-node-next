import Link from 'next/link'
import CartIndicator from '@/components/cart/CartIndicator'

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="logo">
          Tornometal
        </Link>

        <nav className="header-actions">
          <CartIndicator />
        </nav>
      </div>
    </header>
  )
}
