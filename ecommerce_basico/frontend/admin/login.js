document
  .getElementById('login-form')
  .addEventListener('submit', async e => {
    e.preventDefault()

    const user = document.getElementById('user').value
    const pass = document.getElementById('pass').value

    const res = await fetch('/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass })
    })

    const data = await res.json()

    if (data.token) {
      localStorage.setItem('adminToken', data.token)
      location.href = '/frontend/admin'
    } else {
      alert(data.error || 'Login inválido')
    }
  })