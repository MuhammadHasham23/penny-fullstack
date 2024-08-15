import { Route } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { LoginComponent } from '../login/login.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { RegisterComponent } from '../register/register.component'
import {AuthGuard} from './guards/auth.guard'

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent }, // Login route should be the first one
  { path: 'register', component: RegisterComponent }, // Register route
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login by default
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard], // Protect this route with AuthGuard
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];
