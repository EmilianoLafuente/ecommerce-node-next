export function validateProduct(product) {
  const errors = []

  if (!product.brand || product.brand.trim().length < 2) {
    errors.push('La marca es obligatoria')
  }

  if (!product.model || product.model.trim().length < 2) {
    errors.push('El modelo es obligatorio')
  }

  if (!Number.isInteger(product.width) || product.width <= 0) {
    errors.push('Ancho inválido')
  }

  if (!Number.isInteger(product.profile) || product.profile <= 0) {
    errors.push('Perfil inválido')
  }

  if (!Number.isInteger(product.rim) || product.rim <= 0) {
    errors.push('Rodado inválido')
  }

  if (typeof product.price !== 'number' || product.price <= 0) {
    errors.push('Precio inválido')
  }

  if (!Number.isInteger(product.stock) || product.stock < 0) {
    errors.push('Stock inválido')
  }

  return errors
}
