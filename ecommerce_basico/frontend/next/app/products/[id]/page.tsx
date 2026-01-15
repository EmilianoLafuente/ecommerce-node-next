// app/products/[id]/page.tsx

import { getProductById } from '@/services/products.service'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const numericId = Number(id)

  if (Number.isNaN(numericId)) {
    notFound()
  }

  try {
    const product = await getProductById(numericId)

    return (
      <main style={{ padding: '2rem' }}>
        <h1>{product.title}</h1>

        <p>{product.description}</p>

        <strong>Precio: ${product.price}</strong>

        <div>Stock disponible: {product.stock}</div>
      </main>
    )
  } catch {
    notFound()
  }
}