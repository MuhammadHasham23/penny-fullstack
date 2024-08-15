import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.checkIfLoggedIn(); // Implement your logic to check if the user is logged in

    if (!isLoggedIn) {
      // Redirect to login if not logged in
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  private checkIfLoggedIn(): boolean {
    // Replace this with your actual login check logic
    return !!localStorage.getItem('token'); // Example: Check if a token exists in localStorage
  }
}
