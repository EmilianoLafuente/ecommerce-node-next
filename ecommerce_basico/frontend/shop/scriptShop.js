let products = []
let cart = []

const API_BASE = '/api/v1'

//Funciones para armar lo visual y consumible
async function apiGetProducts() {
  const res = await fetch(`${API_BASE}/products`)
  return await res.json()
}

async function loadProducts() {
  products = await apiGetProducts()
  renderProducts()
}

function renderProducts() {
  const productsDiv = document.getElementById('products')
  productsDiv.innerHTML = ''

  products.forEach(product => {
    const card = document.createElement('div')
    card.className = 'card'

    card.innerHTML = `
    <h3>${product.brand} ${product.model}</h3>
    <p>${product.width}/${product.profile} R${product.rim}</p>
    <p>Precio: $${product.price}</p>

    <button onclick="addToCart(${product.id})">
        Agregar
    </button>
    `

    productsDiv.appendChild(card)
  })
}

//Funciones para ACCIONES del cliente
// Agregar al carrito
function addToCart(productId) {
  const product = products.find(p => p.id === productId)
  if (!product) return

  const item = cart.find(i => i.id === productId)

  if (item) {
    item.quantity++
  } else {
    cart.push({
      ...product,
      quantity: 1
    })
  }

  renderCart()
}

// Increse or decrese items in cart front
function increaseQty(id) {
  const item = cart.find(i => i.id === id)
  if (!item) return

  item.quantity++
  renderCart()
}

function decreaseQty(id) {
  const index = cart.findIndex(i => i.id === id)
  if (index === -1) return

  cart[index].quantity--

  if (cart[index].quantity === 0) {
    cart.splice(index, 1)
  }

  renderCart()
}

// Render carrito
function renderCart() {
  const cartUl = document.getElementById('cart')
  const totalSpan = document.getElementById('total')

  cartUl.innerHTML = ''
  let total = 0

  cart.forEach(item => {
    total += item.price * item.quantity

    const li = document.createElement('li')
        li.innerHTML = `
      ${item.brand} ${item.model}
      <button onclick="decreaseQty(${item.id})">−</button>
      <strong>${item.quantity}</strong>
      <button onclick="increaseQty(${item.id})">+</button>
    `
    cartUl.appendChild(li)
  })

  totalSpan.textContent = total
}


// Confirmar compra (simulado)
async function confirmPurchase() {
  if (!cart.length) {
    alert('El carrito está vacío')
    return
  }

  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart)
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error)
    }

    alert('Compra confirmada ✔️\nOrden #' + data.id)

    cart.length = 0
    renderCart()
    await loadProducts() // recarga stock actualizado

  } catch (error) {
    alert('Error al confirmar compra:\n' + error.message)
  }
}

loadProducts()