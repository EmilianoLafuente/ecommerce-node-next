import { confirmOrder } from '../services/orderService.js'
import { sendSuccess, sendError } from '../utils/response.js'
import { getBody } from '../utils/http.js'

/*** POST /orders | Confirmar compra (SHOP) | Migrado a express 14/1/26*/
export const create = async (req, res) => {
  try {
    const { items } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return sendError(res, new Error('Carrito inválido'))
    }

    const order = await confirmOrder(items)
    sendSuccess(res, 201, order)

  } catch (error) {
    sendError(res, error)
  }
}


