import { CartItem } from "../../models/cart-item.model";

export interface CartState {
    items: CartItem[];
    total: number;
}

export const initialCartState: CartState = {
    items: [],
    total:0
};