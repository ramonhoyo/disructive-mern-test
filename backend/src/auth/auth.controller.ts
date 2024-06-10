import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserTypes } from 'src/users/users.types';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @Public()
  siginIn(@Body() body: LoginDto): Promise<LoginResponseDto> {
    return this.authService.singIn(body.usernameOrEmail);
  }

  @Post('register')
  @Public()
  siginUp(@Body() body: RegisterUserDto): Promise<LoginResponseDto> {
    const role = body.role;
    if (role !== UserTypes.Reader && role !== UserTypes.Creator) {
      throw new BadRequestException("Invalid user role, must be one of [Reader, Creator]");
    }

    return this.authService.singUp(body);
  }
}
