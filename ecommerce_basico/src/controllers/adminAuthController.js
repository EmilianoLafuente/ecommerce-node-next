import { getBody } from '../utils/http.js'
import { sendSuccess, sendError } from '../utils/response.js'

const ADMIN = {
  user: 'admin',
  pass: '1234'
}

/* Migrado a express 14/1/26 */
export const login = async (req, res) => {
  try {
    const { user, pass } = req.body

    if (user !== ADMIN.user || pass !== ADMIN.pass) {
      throw new Error('Credenciales inválidas')
    }

    const token = 'admin-token-simple'
    sendSuccess(res, 200, { token })

  } catch (error) {
    sendError(res, error)
  }
}