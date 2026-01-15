import Link from 'next/link'
import { Product } from '@/services/products.service'
import AddToCartButton from '@/components/AddToCartButton'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <article
      style={{
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem'
      }}
    >
    {/* IMAGEN DEL PRODUCTO */}
      {product.images?.length > 0 && (
        <img
          src={product.images[0]}
          alt={`${product.brand} ${product.model}`}
          style={{ width: '100%', maxWidth: '300px', marginBottom: '0.5rem' }}
        />
      )}

      <Link href={`/products/${product.id}`}>
        <h3 style={{ cursor: 'pointer' }}>
          {product.brand} {product.model}
        </h3>
      </Link>

      <div>Medida: {product.width}/{product.profile} R{product.rim}</div>

      <strong>Precio: ${product.price}</strong>

      <div>Stock: {product.stock}</div>

      <AddToCartButton
        maxStock={product.stock}
        item={{
            productId: product.id,
            brand: product.brand,
            model: product.model,
            price: product.price,
            quantity: 1,
            image: product.images?.[0]
        }}
        />

    </article>  
  )
}