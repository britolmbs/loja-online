import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
      this.cartItems = this.cartService.getCartItems();
      this.calculateTotal();
  }
  calculateTotal(): void{
    this.total = this.cartItems.reduce((acc, item) => acc + item.totalPrince, 0);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.productId);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
    this.snackBar.open(`${item.prodctName} removido do carrinho!`, 'Fechar', {
      duration: 2000
    });
  }
  increaseQuantity(item:CartItem): void {
    this.cartService.increaseQuantity(item.productId);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }
  descreaseQuantity(item: CartItem): void {
    this.cartService.descreaseQuantity(item.productId);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }
}

