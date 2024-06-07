import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @Public()
  siginIn(@Body() body: LoginDto) {
    return this.authService.singIn(body.usernameOrEmail);
  }
}
