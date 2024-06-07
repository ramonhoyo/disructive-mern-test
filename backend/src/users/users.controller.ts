import { Body, Controller, Get, Post, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserTypes } from './users.types';
import { Public } from 'src/auth/public.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('/me')
  me(@Request() req: any): any {
    return req.user;
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Public()
  @Post('/register')
  async register(@Body() body: RegisterUserDto) {
    const role = body.role;
    if (role !== UserTypes.Reader && role !== UserTypes.Creator) {
      throw new BadRequestException("Invalid user role, must be one of [Reader, Creator]");
    }

    return this.usersService.create({
      ...body,
      type: role,
    })
  }
}
