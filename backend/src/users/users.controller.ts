import { Body, Controller, Get, Post, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
