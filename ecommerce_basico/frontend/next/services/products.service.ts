// services/products.service.ts

import { apiFetch } from '@/lib/api'

export type Product = {
  id: number
  brand: string
  model: string
  width: number
  profile: number
  rim: number
  price: number
  stock: number
  active: boolean
  images: string[]
}

export async function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>('/products')
}

export async function getProductById(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`)
}