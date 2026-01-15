let products = []
let editingId = null
let orders = []
let currentOrderFilter = 'all'

//Guard para login
const token = localStorage.getItem('adminToken')
const API_BASE = '/api/v1'

if (!token) {
  // no logueado → redirigir
  location.href = '/frontend/admin/login.html'
}

async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

// Formateo de fecha, en el back se guarda con ISO 8601
function formatDateUY(isoDate) {
  const date = new Date(isoDate)

  return date.toLocaleString('es-UY', {
    timeZone: 'America/Montevideo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Toast de confirmacion para cambio de status en ordenes, reutilizable 
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container')

  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  toast.textContent = message

  container.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, 2500)
}


// Calcular total de artículos mas alla de los items
function getTotalItems(order) {
  return order.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  )
}

// -- LOAD --Cargar protucts del JSON
async function loadProducts() {
  const res = await authFetch(`${API_BASE}/admin/products`)
  const response = await res.json() // ⬅️ CLAVE

  // products  = response.data   
  products = response.data

  // if (!Array.isArray(products)) {
  //   console.error('Respuesta inválida:', products)
  //   return
  // }

  if (!Array.isArray(products)) {
  console.error('Respuesta inválida:', response)
  return
}

  renderProducts()
}

loadProducts()

document.getElementById('section-products').classList.add('active')
document
  .querySelector('.nav-item[data-section="products"]')
  .classList.add('active')

//Funciones para ACCIONES del Admin
//Obtener productos en DB local JSON y los filtra para cliente front
async function apiGetProducts() {
  const res = await authFetch(`${API_BASE}/admin/products`)
  return await res.json()
}

// API Delete product
async function apiDeleteProduct(id) {
  await authFetch(`${API_BASE}/admin/products/${id}`, {
    method: 'DELETE'
  })
}

// API Create product
async function apiCreateProduct(product) {
  const res = await authFetch(`${API_BASE}/admin/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }
}

// API Update product
async function apiUpdateProduct(id, updates) {
  await authFetch(`${API_BASE}/admin/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  })
}

// --RENDER--  productos completos dinamico 
function renderProducts() {
  const productsDiv = document.getElementById('products')
  productsDiv.innerHTML = ''

  products.forEach(product => {
    const card = document.createElement('div')
    card.className = 'card'

  card.innerHTML = `
    <div class="card-header">
      <h3>${product.brand} ${product.model}</h3>
      <span class="badge ${product.active ? 'active' : 'inactive'}">
        ${product.active ? 'Activo' : 'Inactivo'}
      </span>
    </div>

    <div class="card-body">
      <p class="size">${product.width}/${product.profile} R${product.rim}</p>
      <p><strong>Precio:</strong> $${product.price}</p>
      <p><strong>Stock:</strong> ${product.stock}</p>
    </div>

    <div class="card-actions">
      <button class="btn primary" onclick="editProduct(${product.id})">
        Modificar
      </button>

      <button class="btn secondary" onclick="addStock(${product.id})">
        + Stock
      </button>

      <button class="btn danger"
      ${product.stock > 0 ? 'disabled' : ''}
       onclick="deleteProduct(${product.id})">
        Eliminar
      </button>
    </div>
  `

    productsDiv.appendChild(card)
  })
}

// --Validaciones--
function validateForm(product) {
  if (!product.brand || !product.model) {
    alert('Marca y modelo son obligatorios')
    return false
  }

  if (product.price <= 0 || product.stock < 0) {
    alert('Precio o stock inválidos')
    return false
  }

  return true
}

// ---------- FORM ----------
const form = document.getElementById('product-form')
const cancelBtn = document.getElementById('cancel-edit')
const formTitle = document.getElementById('form-title')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const product = {
    brand: brand.value,
    model: model.value,
    width: +width.value,
    profile: +profile.value,
    rim: +rim.value,
    price: +price.value,
    stock: +stock.value
  }

  if (!validateForm(product)) return

  try {
    if (editingId) {
      await apiUpdateProduct(editingId, product)
    } else {
      await apiCreateProduct(product)
    }

    resetForm()
    await loadProducts()

  } catch (error) {
    alert('Error: ' + error.message)
  }
})

function editProduct(id) {
  const p = products.find(p => p.id === id)
  editingId = id

  brand.value = p.brand
  model.value = p.model
  width.value = p.width
  profile.value = p.profile
  rim.value = p.rim
  price.value = p.price
  stock.value = p.stock

  formTitle.textContent = 'Editar producto'
  cancelBtn.hidden = false
}

function deleteProduct(id) {
  if (!confirm('¿Eliminar producto?')) return
  apiDeleteProduct(id).then(loadProducts)
}

function resetForm() {
  form.reset()
  editingId = null
  formTitle.textContent = 'Crear producto'
  cancelBtn.hidden = true
}

//add stock para articulo
async function addStock(productId) {
  const qty = prompt('Cantidad a agregar:')

  if (!qty) return

  const quantity = Number(qty)
  if (!Number.isInteger(quantity) || quantity <= 0) {
    alert('Cantidad inválida')
    return
  }

  try {
    const res = await authFetch(`${API_BASE}/admin/products/${productId}/stock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error)
    }

    await loadProducts()

  } catch (error) {
    alert('Error: ' + error.message)
  }
}

//Ordenes carga y verificacion
const ordersContainer = document.getElementById('orders')

async function loadOrders() {

  try {
    const res = await fetch(`${API_BASE}/admin/orders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        'Content-Type': 'application/json'
      }
    })

    const text = await res.text()

    const response = JSON.parse(text)
    orders = response.data

    renderOrders()

  } catch (err) {
    console.error('ERROR REAL:', err)
  }
}

async function changeOrderStatus(orderId, status) {
  try {
    await authFetch(`${API_BASE}/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    })

    closeModal()      // 👈 CLAVE
    await loadOrders() // vuelve a aplicar filtros

    if (status === 'completed') {
      showToast('Orden completada', 'success')
    }

    if (status === 'cancelled') {
      showToast('Orden cancelada', 'error')
    }
    
  } catch (error) {
    alert('Error al cambiar estado')
  }
}

// filtra + renderiza ordenes
function renderOrders() {

  if (!Array.isArray(orders)) return

  ordersContainer.innerHTML = ''

  let filteredOrders = orders

  if (currentOrderFilter !== 'all') {
    filteredOrders = orders.filter(
      o => o.status === currentOrderFilter
    )
  }

  if (!filteredOrders.length) {
    ordersContainer.innerHTML = '<p>No hay órdenes.</p>'
    return
  }

  filteredOrders.forEach(order => {
    const div = document.createElement('div')
    const isPending = order.status === 'pending'
    div.className = 'order-card'

    div.innerHTML = `
      <div class="order-header">
        <strong>#${order.id}</strong>
        <span class="badge ${order.status}">
          ${order.status}
        </span>
      </div>

      <div class="order-total">
        Total: $${order.total}
      </div>

      <small>${formatDateUY(order.createdAt)}</small>
      ${getTotalItems(order)} artículos

      <div class="order-actions">
        <button class="btn secondary"
          onclick="viewOrder(${order.id})">
          Ver detalle
        </button>

        ${
          isPending
            ? `
              <button class="btn primary"
                onclick="changeOrderStatus(${order.id}, 'completed')">
                Completar
              </button>

              <button class="btn danger"
                onclick="changeOrderStatus(${order.id}, 'cancelled')">
                Cancelar
              </button>
            `
            : `
              <span class="order-locked">
                Orden cerrada
              </span>
            `
        }
      </div>
    `

    ordersContainer.appendChild(div)
  })
}

// Filtro por default, ALL
function setActiveFilterButton(status) {
  const filterButtons = document.querySelectorAll('.filter-btn')

  filterButtons.forEach(btn => {
    btn.classList.toggle(
      'active',
      btn.dataset.status === status
    )
  })
}

//JS para el modal de ordenes
let currentOrderId = null

async function viewOrder(id) {
  const res = await authFetch(`${API_BASE}/admin/orders/${id}`)
  const response = await res.json()
  const order = response.data

  const detail = document.getElementById('order-detail')
  const actions = document.getElementById('order-actions')
  // 🔹 historial → HTML
  const history = order.history ?? [
    {
      status: order.status,
      at: order.createdAt
    }
  ]

  const historyHTML = history
    .map(h => `
      <li>
        <strong>${h.status}</strong>
        — ${formatDateUY(h.at)}
      </li>
    `)
    .join('')

  detail.innerHTML = `
    <p><strong>ID:</strong> ${order.id}</p>
    <p><strong>Fecha:</strong> ${formatDateUY(order.createdAt)}</p>
    <p><strong>Total:</strong> $${order.total}</p>

    <ul>
      ${order.items.map(i => `
        <li>${i.description} — x${i.quantity} ($${i.price})</li>
      `).join('')}
    </ul>

    <h4>Historial de estado</h4>
    <ul class="order-history">
      ${historyHTML}
    </ul> 
  `

  // 👉 Acciones según estado
  actions.innerHTML = ''

  if (order.status === 'pending') {
    actions.innerHTML = `
      <button class="btn primary"
        onclick="changeOrderStatus(${order.id}, 'completed')">
        Completar
      </button>

      <button class="btn danger"
        onclick="changeOrderStatus(${order.id}, 'cancelled')">
        Cancelar
      </button>
    `
  } else {
    actions.innerHTML = `
      <span class="order-locked">
        Orden cerrada
      </span>
    `
  }

  actions.innerHTML += `
    <button class="btn secondary" onclick="closeModal()">
      Cerrar
    </button>
  `

  document.getElementById('order-modal').classList.remove('hidden')
}

function closeModal() {
  document.getElementById('order-modal').classList.add('hidden')
}

const filterButtons = document.querySelectorAll('.filter-btn')

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    currentOrderFilter = btn.dataset.status
    renderOrders()
  })
})

// UX Admin con js
// Navegación del admin
const navItems = document.querySelectorAll('.nav-item')
const sections = document.querySelectorAll('.section')

// Items del munu Admin izquierda
navItems.forEach(btn => {
  btn.addEventListener('click', () => {

    // activar botón
    navItems.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    // mostrar sección
    const target = btn.dataset.section

    sections.forEach(section => {
      section.classList.remove('active')
    })

    document
      .getElementById(`section-${target}`)
      .classList.add('active')

    // 👉 cargar órdenes SOLO cuando entro a Órdenes
    if (target === 'orders') {
      currentOrderFilter = 'all'
      setActiveFilterButton('all')
      loadOrders()
    }
  })
})

cancelBtn.addEventListener('click', resetForm)
