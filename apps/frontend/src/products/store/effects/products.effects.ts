import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from '../actions/products.action';
import { Product } from '../../models/product.model';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(loadProducts),
        mergeMap(() => {
          // mock data for a product
          const dummyProducts: Product[] = [
            { id: 1, name: 'Product 1', price: 100, description: 'Description for product 1' },
            { id: 2, name: 'Product 2', price: 150, description: 'Description for product 2' },
            { id: 3, name: 'Product 3', price: 200, description: 'Description for product 3' },
          ];
          return of(loadProductsSuccess({ products: dummyProducts })).pipe(
            catchError((error) => of(loadProductsFailure({ error })))
          );
        })
      )
  })
    
}
