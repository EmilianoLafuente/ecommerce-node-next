export const getBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', chunk => {
      body += chunk
    })

    req.on('end', () => {
      if (!body) {
        return reject(new Error('Body vacío'))
      }

      try {
        const parsed = JSON.parse(body)
        resolve(parsed)
      } catch {
        reject(new Error('JSON inválido'))
      }
    })

    req.on('error', () => {
      reject(new Error('Error leyendo body'))
    })
  })
}