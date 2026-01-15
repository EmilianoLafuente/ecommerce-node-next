// cart/cart.reducer.ts

import { CartAction, CartState } from './cart.types'

export const initialCartState: CartState = {
  items: [],
  checkoutSuccess: false
}

export function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
    const existing = state.items.find(
        item => item.productId === action.payload.productId
    )

    if (existing) {
        return {
        items: state.items.map(item =>
            item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        checkoutSuccess: false
        }
    }

    return {
        items: [...state.items, action.payload],
        checkoutSuccess: false
    }
    }


    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(
          item => item.productId !== action.payload.productId
        ),
        checkoutSuccess: false
      }
    }

    case 'UPDATE_QUANTITY': {
      return {
        items: state.items
          .map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter(item => item.quantity > 0),
          checkoutSuccess: false
      }
    }

    case 'CLEAR_CART': {
      return initialCartState
    }

    case 'CHECKOUT_SUCCESS':
    return {
        items: [],
        checkoutSuccess: true
    }

    default:
      return state
  }
}
