import { Product } from "../../models/product.model";

export interface ProductState {
    products: Product[];
    loading:boolean;
    error: any;
}

export const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
};