import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from '../actions/products.action';
import { Product } from '../../models/product.model';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: any;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);
