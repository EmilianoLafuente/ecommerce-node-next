import Link from 'next/link'
import { Product } from '@/services/products.service'
import AddToCartButton from '@/components/AddToCartButton'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.id}`} className="product-card-link">
        <div className="product-image">
          {product.images?.length > 0 && (
            <img
              src={product.images[0]}
              alt={`${product.brand} ${product.model}`}
            />
          )}
        </div>

        <div className="product-info">
          <h3 className="product-title">
            {product.brand} {product.model}
          </h3>

          <p className="product-measure">
            {product.width}/{product.profile} R{product.rim}
          </p>

          <p className="product-price">
            ${product.price}
          </p>
        </div>
      </Link>

      <div className="product-actions">
        <p className="product-stock">
          Stock: {product.stock}
        </p>

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
      </div>
    </article>
  )
}