import { Body, Controller, Get, NotFoundException, Param, Post, Request } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { TopicsService } from 'src/topics/topics.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UserTypes } from 'src/users/users.types';
import { Roles } from 'src/auth/roles.decorator';

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

  @Roles(UserTypes.Creator)
  @Post()
  async create(
    @Request() req: any,
    @Body() body: CreateEntryDto,
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
      createdBy: req.user,
    });
  }


}
