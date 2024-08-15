import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import {AuthService} from '../services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // On success, navigate to the protected route
        this.router.navigate(['/products']);
      },
      error: (err) => {
        alert('Login failed. Please check your credentials and try again.');
        // Handle error, display message to the user
        console.error('Login failed', err);
      }
    });
  }
}
