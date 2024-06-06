import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) { }

  async findAll() {
    return this.userModel.find();
  }

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      return this.userModel.create(user);
    } catch (error) {

    }
  }
}
