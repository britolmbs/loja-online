import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../../store/state/cart.state';
import { CartItem } from '../../models/cart-item.model';
import { clearCart } from '../../store/actions/cart.actions';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ cart: CartState }>,
    private orderService: OrderService
  ) {
    this.cartItems$ = this.store.select(state => state.cart.items);
    this.total$ = this.store.select(state => state.cart.total);

    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const order = {
        ...this.checkoutForm.value,
        items: [],
        total: 0
      };

      this.cartItems$.subscribe(items => order.items = items);
      this.total$.subscribe(total => order.total = total);

      this.orderService.placeOrder(order).subscribe(response => {
        console.log('Order placed successfully:', response);
        this.store.dispatch(clearCart());
      });
    }
  }
}
