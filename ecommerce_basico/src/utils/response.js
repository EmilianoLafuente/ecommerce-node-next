import AppError from '../errors/AppError.js'

export const sendSuccess = (res, statusCode = 200, data = null) => {
  res.status(statusCode).json({
    data
  })
}

export const sendError = (res, error) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message
    })
  }

  console.error(error)

  res.status(500).json({
    error: 'Internal server error'
  })
}