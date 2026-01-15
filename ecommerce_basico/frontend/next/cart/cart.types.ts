// cart/cart.types.ts

//No guardamos todos lo datos, Guardamos solo lo mínimo necesario
export type CartItem = {
  productId: number
  brand: string
  model: string
  price: number
  quantity: number
  image?: string
}

export type CartState = {
  items: CartItem[],
  checkoutSuccess: boolean
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'CHECKOUT_SUCCESS' }   // 👈 ESTA LÍNEA