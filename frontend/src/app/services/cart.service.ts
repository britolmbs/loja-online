import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  getCartItems(): Product[] {
    return this.cart;
  }

  removeFromCart(product: Product): void {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }

  clearCart(): void {
    this.cart = [];
  }

  getCartTotal(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }
}
