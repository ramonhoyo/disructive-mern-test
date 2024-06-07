import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserTypes } from 'src/users/users.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }


  async singIn(usernameOrEmail: string) {
    const user = await this.usersService.findOneByEmailOrUsername(
      usernameOrEmail,
      usernameOrEmail,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    }
  }

  async singUp(data: RegisterUserDto) {
    const { role, ...other } = data;
    const user = await this.usersService.create({
      ...other,
      type: role as UserTypes,
    });

    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    }
  }
}
