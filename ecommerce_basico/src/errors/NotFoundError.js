import AppError from './AppError.js'

export default class NotFoundError extends AppError {
  constructor(message = 'Not found') {
    super(message, 404)
  }
}