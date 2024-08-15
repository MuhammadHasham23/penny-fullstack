import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  resetToken: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    // Extract the token from the URL
    this.resetToken = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.resetToken) {
     alert('Invalid or missing token.');
      this.router.navigate(['/login']);
    }
  }

  resetPassword() {
    if (this.password !== this.confirmPassword) {
     alert('Passwords do not match.');
      return;
    }

    this.authService.resetPassword(this.resetToken, this.password).subscribe({
      next: () => {
       alert('Password reset successfully. Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
       alert('Failed to reset password. Please try again.');
      }
    });
  }
}
