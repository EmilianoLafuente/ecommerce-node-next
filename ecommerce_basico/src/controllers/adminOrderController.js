// 🎯 Responsabilidad

// Administración de órdenes
// Lectura y cambio de estado
// NO maneja stock
// NO decide reglas de negocio complejas

import {getAllOrders, getOrderById, updateOrderStatus} from '../services/orderService.js'

import { sendSuccess, sendError } from '../utils/response.js'
import { getBody } from '../utils/http.js'
import BadRequestError from '../errors/BadRequestError.js'

/**
 * GET /admin/orders | Listar todas las órdenes */
export const getAll = async (req, res) => {

  try {
    const orders = await getAllOrders()
    sendSuccess(res, 200, orders)
  } catch (error) {
    sendError(res, error)
  }
}

/*** GET /admin/orders/:id | Ver detalle de una orden */
export const getById = async (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return sendError(res, new BadRequestError('ID inválido'))
  }

  try {
    const order = await getOrderById(id)
    sendSuccess(res, 200, order)
  } catch (error) {
    sendError(res, error)
  }
}

/*** PATCH /admin/orders/:id/status | Cambiar estado de la orden | Migrado a express 14/1/26 ***/
export const updateStatus = async (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return sendError(res, new BadRequestError('ID inválido'))
  }

  try {
    const { status } = req.body

    const VALID_STATUSES = ['pending', 'completed', 'cancelled']

    if (!VALID_STATUSES.includes(status)) {
      throw new BadRequestError('Estado inválido')
    }

    const order = await updateOrderStatus(id, status)
    sendSuccess(res, 200, order)

  } catch (error) {
    sendError(res, error)
  }
}