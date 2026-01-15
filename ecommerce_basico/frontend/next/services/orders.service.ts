import { apiFetch } from '@/lib/api'

type OrderItemPayload = {
  id: number
  quantity: number
}

type CreateOrderPayload = {
  items: OrderItemPayload[]
}

export async function createOrder(payload: CreateOrderPayload) {
  return apiFetch('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}
