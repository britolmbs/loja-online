import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
  }

  increaseQuantity(productId: number): void {
    const item = this.cartItems.find(cartItem => cartItem.productId === productId);
    if (item) {
      item.quantity += 1;
    }
  }

  decreaseQuantity(productId: number): void {
    const item = this.cartItems.find(cartItem => cartItem.productId === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeFromCart(productId);
    }
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
