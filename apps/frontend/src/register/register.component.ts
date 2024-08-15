import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        // On successful registration, navigate to the home or products page
        this.router.navigate(['/login']);
      },
      error: () => {
        // Show snackbar or alert on registration failure
        alert('Registration failed. Please try again.');
      }
    });
  }
}
