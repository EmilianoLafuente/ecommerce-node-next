import { getAllProducts, getProductById } from '../services/productService.js'
import { sendSuccess, sendError } from '../utils/response.js'

/**
 * GET /products
 * Productos activos (SHOP)
 */
export const getAll = async (req, res) => {
  
  try {
    const products = await getAllProducts()
    sendSuccess(res, 200, products)
  } catch (error) {
    sendError(res, error)
  }
}

/**
 * GET /products/:id
 * Producto activo por ID (SHOP)
 */
export const getById = async (req, res) => {
  const id = Number(req.params.id)

  try {
    const product = await getProductById(id)
    sendSuccess(res, 200, product)
  } catch (error) {
    sendError(res, error)
  }
}
