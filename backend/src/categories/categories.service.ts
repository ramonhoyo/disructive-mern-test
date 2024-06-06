import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) { }

  findAll() {
    return this.categoryModel.find();
  }

  create(body: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.categoryModel.create(body);
  }
}
