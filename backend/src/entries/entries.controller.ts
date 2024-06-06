import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { TopicsService } from 'src/topics/topics.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UserTypes } from 'src/users/users.types';

@Controller('entries')
export class EntriesController {
  constructor(
    private readonly entriesService: EntriesService,
    private readonly topicsService: TopicsService,
  ) { }

  @Get()
  findAll() {
    return this.entriesService.findAll();
  }

  @Get(':id')
  findEntryById(@Param('id') id: string) {
    return this.entriesService.findOne(id);
  }

  @Post()
  async create(
    @Body() body: CreateEntryDto
  ) {
    const topic = await this.topicsService.findById(body.topicId);
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    return this.entriesService.create({
      ...body,
      topic,
      url: body.url || '',
      content: body.content || '',
      createdBy: {
        id: 'fake-user-id',
        username: 'fake-user',
        email: 'fake@email.com',
        type: UserTypes.Creator,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }


}
