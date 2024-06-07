import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UserTypes } from 'src/users/users.types';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('topics')
@UseGuards(RolesGuard)
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
  ) { }

  @Get()
  findAll() {
    return this.topicsService.findAll();
  }

  @Post()
  @Roles(UserTypes.Creator, UserTypes.Admin)
  create(@Body() body: CreateTopicDto) {
    return this.topicsService.create({
      title: body.title,
      img: 'https://via.placeholder.com/230',
    });
  }
}
