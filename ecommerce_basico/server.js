// import http from 'http'
// import fs from 'fs/promises'
// import path from 'path'
// import { fileURLToPath } from 'url'

// import * as productController from './src/controllers/productController.js'
// import * as adminProductController from './src/controllers/adminProductController.js'
// import * as orderController from './src/controllers/orderController.js'
// import * as adminOrderController from './src/controllers/adminOrderController.js'
// import { requireAdminAuth } from './src/utils/auth.js'
// import * as adminAuthController from './src/controllers/adminAuthController.js'
// import { API_BASE } from './src/config/api.js'
// import { isRoute } from './src/utils/router.js'

import app from './src/app.js'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
const PORT = 3000

// const server = http.createServer(async (req, res) => {
//   try {

//     // ======================
//     // API (SIEMPRE PRIMERO)
//     // ======================
//     // SHOP PRODUCTS
//     if (isRoute(req, 'GET', `${API_BASE}/products`)) {
//     return productController.getAll(req, res)
//     }
//     // SHOP All product 
//     if (req.method === 'GET' && req.url.startsWith('/products/')) {
//       const id = Number(req.url.split('/')[2])
//       return productController.getById(req, res, id)
//     }
//     // SHOP product by id
//     if (req.method === 'GET' && req.url.startsWith(`${API_BASE}/products/`)) {
//         const id = Number(req.url.split('/')[4])
//         return productController.getById(req, res, id)
//     }
        
//     // ORDERS
//     if (isRoute(req, 'POST', `${API_BASE}/orders`)) {
//     return orderController.create(req, res)
//     }


//     // -------- ADMIN AUTH --------
//     if (req.method === 'POST' && req.url === '/admin/login') {
//     return adminAuthController.login(req, res)
//     }

//     // ADMIN PRODUCTS
//     if (req.method === 'GET' && req.url === '/admin/products') {
//       return adminProductController.getAll(req, res)
//     }

//     if (req.method === 'POST' && req.url === '/admin/products') {
//       return adminProductController.create(req, res)
//     }

//     if (req.method === 'POST' && req.url.startsWith('/admin/products/') && req.url.endsWith('/stock')) {
//       const id = Number(req.url.split('/')[3])
//       return adminProductController.addStock(req, res, id)
//     }

//     if (req.method === 'PUT' && req.url.startsWith('/admin/products/')) {
//       const id = Number(req.url.split('/')[3])
//       return adminProductController.update(req, res, id)
//     }

//     if (req.method === 'DELETE' && req.url.startsWith('/admin/products/')) {
//       const id = Number(req.url.split('/')[3])
//       return adminProductController.remove(req, res, id)
//     }

//     // -------- ADMIN ORDERS --------
//     if (req.method === 'GET' && req.url === '/admin/orders') {
//     return adminOrderController.getAll(req, res)
//     }

//     if (req.method === 'GET' && req.url.startsWith('/admin/orders/')) {
//     const id = Number(req.url.split('/')[3])
//     return adminOrderController.getById(req, res, id)
//     }

//     if ( req.method === 'PATCH' && req.url.startsWith('/admin/orders/') && req.url.endsWith('/status')) {
//     const id = Number(req.url.split('/')[3])
//     return adminOrderController.updateStatus(req, res, id)
//     }

//     // ======================
//     // FRONTEND (AL FINAL)
//     // ======================

//     let filePath = req.url
//     if (req.url === '/') filePath = '/frontend/shop/index.html'
//     if (req.url === '/frontend/admin') filePath = '/frontend/admin/index.html'
//     if (req.url === '/frontend/shop') filePath = '/frontend/shop/index.html'

//     const fullPath = path.join(__dirname, filePath)
//     const file = await fs.readFile(fullPath)

//     if (filePath.endsWith('.html')) res.setHeader('Content-Type', 'text/html')
//     if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css')
//     if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript')

//     res.end(file)

//   } catch (error) {
//     res.writeHead(404, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify({ error: 'Not found' }))
//   }
// })

app.listen(PORT, () => {
  console.log(`🚀 API + Frontend en http://localhost:${PORT}`)
})


/*

🧠 QUÉ CAMBIÓ (resumen mental)
Antes	Ahora
Routing manual	Routing declarativo
req.url	req.params
Parse body a mano	express.json()
fs + path	express.static
1 archivo gigante	responsabilidades separadas

*/