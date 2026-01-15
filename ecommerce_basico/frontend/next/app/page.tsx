

import Container from '@/components/layout/Container'
import ProductGrid from '@/components/product/ProductGrid'
import { getProducts } from '@/services/products.service'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <Container>
      <h1 className="page-title">Productos</h1>
      <ProductGrid products={products} />
    </Container>
  )
}