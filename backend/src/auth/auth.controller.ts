import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  siginIn(@Body('usernameOrEmail') usernameOrEmail: string) {
    return this.authService.singIn(usernameOrEmail);
  }
}
