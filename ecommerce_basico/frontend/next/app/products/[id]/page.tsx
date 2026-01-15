import Container from '@/components/layout/Container'
import { getProductById } from '@/services/products.service'
import AddToCartButton from '@/components/AddToCartButton'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params   // 👈 CLAVE
  const product = await getProductById(Number(id))

  return (
    <Container>
      <div className="product-detail">
        <div className="product-detail-image">
          {product.images?.length > 0 && (
            <img
              src={product.images[0]}
              alt={`${product.brand} ${product.model}`}
            />
          )}
        </div>

        <div className="product-detail-info">
          <h1>{product.brand} {product.model}</h1>

          <p className="product-detail-measure">
            Medida: {product.width}/{product.profile} R{product.rim}
          </p>

          <p className="product-detail-price">
            ${product.price}
          </p>

          <p className="product-detail-stock">
            Stock disponible: {product.stock}
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
      </div>
    </Container>
  )
}