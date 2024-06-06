import { Body, Controller, Get, Post } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';

@Controller('topics')
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
  ) { }


  @Get()
  findAll() {
    return this.topicsService.findAll();
  }

  @Post()
  // TODO: add validation pipe for file upload
  create(@Body() body: CreateTopicDto) {
    return this.topicsService.create({
      title: body.title,
      img: 'https://via.placeholder.com/230',
    });
  }
}
