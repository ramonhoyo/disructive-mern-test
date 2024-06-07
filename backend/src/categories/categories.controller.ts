import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserTypes } from 'src/users/users.types';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) { }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  @Roles(UserTypes.Admin)
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body);
  }
}
