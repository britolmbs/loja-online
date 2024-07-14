import { Injectable } from "@angular/core";
import { Actions ,createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { CartItem } from "../../models/cart-item.model";
import { CartService } from '../../services/cart.service';
import * as CartActions from '../actions/cart.actions';

@Injectable()
export class CartEffects {
    loadCartItem$ = createEffect(() => this.action$.pipe(
        ofType('[Cart] Load Cart Item'),
        mergeMap(() => this.cartService.getCartItems()
    .pipe(
        map(CartItems => ({type: '[Cart API] Cart Items Loaded Success', payload: CartItem })),
        catchError(()=> EMPTY)
    ))
    )
);
addToCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.addToCart),
    mergeMap(action => {
        this.cartService.addToCart(action.item);
        return EMPTY;
    })
), { dispatch: false});

removeFromCart$ = createEffect(() => this.action$.pipe(
    ofType(CartActions.removeFromCart),
    mergeMap(action => {
        this.cartService.removeFromCart(action.productId);
        return  EMPTY;
})
), {dispatch: false});

increaseQuantity$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.increaseQuantity),
    mergeMap(action => {
      this.cartService.increaseQuantity(action.productId);
      return EMPTY;
    })
  ), { dispatch: false });

  decreaseQuantity$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.decreaseQuantity),
    mergeMap(action => {
      this.cartService.decreaseQuantity(action.productId);
      return EMPTY;
    })
  ), { dispatch: false });

  clearCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.clearCart),
    mergeMap(() => {
      this.cartService.clearCart();
      return EMPTY;
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private cartService: CartService
  ) {}
}