import { createAction, props } from "@ngrx/store";
import { CartItem } from "../../models/cart-item.model";

export const addToCart = createAction(
    '[Cart] Add to Cart',
    props<{ item: CartItem}>()
);

export const removeFromCart = createAction(
    '[Cart] Remove from Cart',
    props<{productId: number}>()
);

export const increaseQuantity = createAction(
    '[Cart] Increase Quantity',
    props<{productId: number }>()   
);

export const decreaseQuantity = createAction(
    '[Cart] Decrease Quantity',
    props<{productId: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');