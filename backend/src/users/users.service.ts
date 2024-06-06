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

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findOneByEmailOrUsername(email: string, username: string) {
    return this.userModel.findOne({ $or: [{ email }, { username }] });
  }

  create(body: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.userModel.create(body);
  }
}
