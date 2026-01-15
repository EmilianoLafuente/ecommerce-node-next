// app/page.tsx

import Link from 'next/link'
import { getProducts } from '@/services/products.service'
import ProductCard from '@/components/ProductCard'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Productos</h1>

      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  )
}