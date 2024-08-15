import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  sendResetLink() {
    this.authService.sendPasswordResetLink(this.email).subscribe({
      next: () => {
        // Show success message
        alert('Password reset link sent. Check your email.')
      },
      error: (err) => {
        // Show error message
        alert('Failed to send reset link. Please try again.')
      }
    });
  }
}
