'use client'

import {createContext, useContext, useEffect, useReducer} from 'react'
import {CartItem, CartState} from './cart.types'
import {cartReducer, initialCartState} from './cart.reducer'

// ------------------------------------
// Context shape
// ------------------------------------

type CartContextType = {
  state: CartState
  addItem: (item: CartItem) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  checkoutSuccess: () => void
}

// ------------------------------------
// Create context
// ------------------------------------

const CartContext = createContext<CartContextType | null>(null)

// ------------------------------------
// Provider
// ------------------------------------

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  // 🔁 Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      dispatch({
        type: 'CLEAR_CART'
      })

      const parsed: CartState = JSON.parse(stored)

      parsed.items.forEach(item => {
        dispatch({
          type: 'ADD_ITEM',
          payload: item
        })
      })
    }
  }, [])

  // 💾 Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  // ------------------------------------
  // Actions
  // ------------------------------------

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity }
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const checkoutSuccess = () => {
  dispatch({ type: 'CHECKOUT_SUCCESS' })
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        checkoutSuccess
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ------------------------------------
// Hook
// ------------------------------------

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}