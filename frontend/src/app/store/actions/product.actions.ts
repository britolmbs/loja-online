import { createAction, props} from '@ngrx/store';
import { Product } from '../../models/product.model';

export const loadProducts = createAction(
    '[Product] Load Products'
);

export const loadProductsSuccess = createAction(
    '[Product] Load Products Success',
    props<{ products: Product[] }>()
);

export const loadProductsFalilure = createAction(
    '[Product] Load Products Falure',
    props<{ error: any }>()
);

export const addProduct = createAction(
'[Product] Add Product Success',
props<{ product: Product}>()
);

export const addProductFailure = createAction(
    '[Product] Add Product Failure',
    props<{ error: any }>()
);