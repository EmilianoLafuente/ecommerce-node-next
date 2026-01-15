import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { API_BASE } from './config/api.js'

// controllers
import * as productController from './controllers/productController.js'
import * as orderController from './controllers/orderController.js'
import * as adminProductController from './controllers/adminProductController.js'
import * as adminOrderController from './controllers/adminOrderController.js'
import * as adminAuthController from './controllers/adminAuthController.js'

// middleware
import { requireAdminAuth } from './utils/auth.js'


const app = express()

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// ======================
// CONFIG
// ======================
app.use(express.json())

// ======================
// API v1 — SHOP
// ======================
app.get(`${API_BASE}/products`, productController.getAll)
app.get(`${API_BASE}/products/:id`, productController.getById)
app.post(`${API_BASE}/orders`, orderController.create)

// ======================
// API v1 — ADMIN
// ======================
app.post(`${API_BASE}/admin/login`, adminAuthController.login)

app.get(
  `${API_BASE}/admin/products`,
  requireAdminAuth,
  adminProductController.getAll
)

app.post(
  `${API_BASE}/admin/products`,
  requireAdminAuth,
  adminProductController.create
)

app.put(
  `${API_BASE}/admin/products/:id`,
  requireAdminAuth,
  adminProductController.update
)

app.delete(
  `${API_BASE}/admin/products/:id`,
  requireAdminAuth,
  adminProductController.remove
)

app.post(
  `${API_BASE}/admin/products/:id/stock`,
  requireAdminAuth,
  adminProductController.addStock
)

// ADMIN ORDERS
app.get(
  `${API_BASE}/admin/orders`,
  requireAdminAuth,
  adminOrderController.getAll
)

app.get(
  `${API_BASE}/admin/orders/:id`,
  requireAdminAuth,
  adminOrderController.getById
)

app.patch(
  `${API_BASE}/admin/orders/:id/status`,
  requireAdminAuth,
  adminOrderController.updateStatus
)

// ======================
// FRONTEND (static)
// ======================
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(
  '/frontend',
  express.static(path.join(__dirname, '..', 'frontend'))
)

export default app