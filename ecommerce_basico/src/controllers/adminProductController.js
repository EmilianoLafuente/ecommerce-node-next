import {getAllProductsAdmin, addProduct, updateProduct, deleteProduct, increaseStock} from '../services/productService.js'
import { sendSuccess, sendError } from '../utils/response.js'
import { getBody } from '../utils/http.js'

/*** GET /admin/products
 * Devuelve todos los productos (activos e inactivos)
 */
export const getAll = async (req, res) => {
  try {
    const products = await getAllProductsAdmin()
    sendSuccess(res, 200, products)
  } catch (error) {
    sendError(res, error)
  }
}

/*** POST /admin/products | Crear producto | Migrado a express 14/1/26 ***/
export const create = async (req, res) => {
  try {
    const productData = req.body

    if (!productData) {
      return sendError(res, new Error('Body vacío'))
    }

    const product = await addProduct(productData)
    sendSuccess(res, 201, product)

  } catch (error) {
    sendError(res, error)
  }
}


/*** PUT /admin/products/:id | Actualizar producto | Migrado a express 14/1/26 ***/
export const update = async (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return sendError(res, new Error('ID inválido'))
  }

  try {
    const updates = req.body
    const product = await updateProduct(id, updates)
    sendSuccess(res, 200, product)

  } catch (error) {
    sendError(res, error)
  }
}

/*** DELETE /admin/products/:id
 * Borrado lógico
 */
export const remove = async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return sendError(res, new Error('ID inválido'))
  }

  try {
    await deleteProduct(id)
    sendSuccess(res, 200, { success: true })
  } catch (error) {
    sendError(res, error)
  }
}

/*** POST /admin/products/:id/stock | Aumentar stock | Migrado a express 14/1/26 ***/
export const addStock = async (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return sendError(res, new Error('ID inválido'))
  }

try {
    const { quantity } = req.body

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return sendError(res, new Error('Cantidad inválida'))
    }

    const product = await increaseStock(id, quantity)
    sendSuccess(res, 200, product)

  } catch (error) {
    sendError(res, error)
  }
}