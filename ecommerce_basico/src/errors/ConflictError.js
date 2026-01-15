import AppError from './AppError.js'

export default class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, 409)
  }
}