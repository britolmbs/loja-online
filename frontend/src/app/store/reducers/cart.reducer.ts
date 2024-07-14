import { createReducer, on, Action } from '@ngrx/store';
import { CartItem } from '../../models/cart-item.model';
import * as CartActions from '../actions/cart.actions';

export interface CartState {
  items: CartItem[];
  total: number;
}

export const initialState: CartState = {
  items: [],
  total: 0
};

const _cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { item }) => {
    const existingItem = state.items.find(cartItem => cartItem.productId === item.productId);
    let updatedItems;
    if (existingItem) {
      updatedItems = state.items.map(cartItem =>
        cartItem.productId === item.productId
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity, totalPrice: cartItem.totalPrice + item.totalPrice }
          : cartItem
      );
    } else {
      updatedItems = [...state.items, item];
    }
    const newTotal = state.total + item.totalPrice;
    return {
      ...state,
      items: updatedItems,
      total: newTotal
    };
  }),
  on(CartActions.removeFromCart, (state, { productId }) => {
    const itemToRemove = state.items.find(cartItem => cartItem.productId === productId);
    const updatedItems = state.items.filter(cartItem => cartItem.productId !== productId);
    const newTotal = state.total - (itemToRemove ? itemToRemove.totalPrice : 0);
    return {
      ...state,
      items: updatedItems,
      total: newTotal
    };
  }),
  on(CartActions.increaseQuantity, (state, { productId }) => {
    const updatedItems = state.items.map(cartItem =>
      cartItem.productId === productId
        ? { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: cartItem.totalPrice + cartItem.price }
        : cartItem
    );
    const newTotal = state.total + (state.items.find(cartItem => cartItem.productId === productId)?.price || 0);
    return {
      ...state,
      items: updatedItems,
      total: newTotal
    };
  }),
  on(CartActions.decreaseQuantity, (state, { productId }) => {
    const existingItem = state.items.find(cartItem => cartItem.productId === productId);
    let updatedItems;
    let newTotal = state.total;
    if (existingItem && existingItem.quantity > 1) {
      updatedItems = state.items.map(cartItem =>
        cartItem.productId === productId
          ? { ...cartItem, quantity: cartItem.quantity - 1, totalPrice: cartItem.totalPrice - cartItem.price }
          : cartItem
      );
      newTotal -= existingItem.price;
    } else {
      updatedItems = state.items.filter(cartItem => cartItem.productId !== productId);
      newTotal -= existingItem ? existingItem.totalPrice : 0;
    }
    return {
      ...state,
      items: updatedItems,
      total: newTotal
    };
  }),
  on(CartActions.clearCart, state => {
    return {
      ...state,
      items: [],
      total: 0
    };
  })
);

export function cartReducer(state: CartState | undefined, action: Action) {
  return _cartReducer(state, action);
}
