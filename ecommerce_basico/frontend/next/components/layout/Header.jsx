import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/">
          <strong>Ecommerce</strong>
        </Link>

        <nav>
          <Link href="/cart">Carrito</Link>
        </nav>
      </div>
    </header>
  )
}