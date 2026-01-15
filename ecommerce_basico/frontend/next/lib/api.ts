// lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined')
}

type ApiResponse<T> = {
  data: T
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    cache: 'no-store', // importante para desarrollo
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status}`)
  }

  const json: ApiResponse<T> = await res.json()
  return json.data
}