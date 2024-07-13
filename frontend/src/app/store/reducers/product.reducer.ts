import { createReducer, on, Action } from "@ngrx/store";
import { Product } from "../../models/product.model";
import * as ProductActions from '../actions/product.actions';
import { state } from "@angular/animations";

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: any;
}

export const intitialState: ProductState = {
    products: [],
    loading: false,
    error: null
};

const productReducer = createReducer(
    intitialState,

    on(ProductActions.loadProducts, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(ProductActions.loadProductsSuccess, (state, { products }) => ({
        ...state,
        products: products,
        loading: false,
        error: null
    })),

    on(ProductActions.loadProductsFalilure, (state, {error}) =>({
        ...state,
        loading: false,
        error: error
    })),
);

export function reducer(state: ProductState | undefined, action: Action) {
    return productReducer(state, action);
}

export const getProducts = (state: ProductState) => state.products;
export const getProductsLoading = (state: ProductState) => state.loading;
export const getProductsError = (state: ProductState) => state.error;