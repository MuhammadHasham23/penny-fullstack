import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(username, email, password);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const {token} = await this.authService.login(email, password);

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 8 * 60 * 60 * 1000
    });

    return res.status(200).json({ message: 'Login successful', token });
  }

  @Post('signout')
  signOut(@Res() res: Response) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.status(200).json({ message: 'Signed out successfully' });
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string): Promise<void> {
    return this.authService.requestPasswordReset(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('password') newPassword: string,
  ): Promise<void> {
    return this.authService.resetPassword(token, newPassword);
  }
}
