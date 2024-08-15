import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProductsState, selectAllProducts } from './store/reducers/products.reducer';
import {loadProducts} from './store/actions/products.action'
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]> = this.store.select(selectAllProducts);
  
  constructor(private store: Store<ProductsState>, private router: Router) {}
  ngOnInit() {
    this.store.dispatch(loadProducts());
  }

  signOut() {
    // Logic to sign out the user
    // For example, clear authentication tokens and navigate to login page
    localStorage.removeItem('token'); // Or whichever method you use for auth
    this.router.navigate(['/login']); // Navigate to login page after sign out
  }
}
