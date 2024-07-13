import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import * as ProductActions from '../actions/product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProducts),
    mergeMap(() => this.productService.getProducts()
      .pipe(
        map(products => ProductActions.loadProductsSuccess({ products })),
        catchError(error => of(ProductActions.loadProductsFalilure({ error })))
      ))
    )
  );

  // Outros efeitos podem ser adicionados conforme necessário

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
