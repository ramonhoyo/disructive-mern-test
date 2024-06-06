import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) { }

  findAll() {
    return this.userModel.find();
  }

  create(body: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.userModel.create(body);
  }
}
