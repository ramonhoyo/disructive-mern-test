import { BadRequestException, Body, Controller, Get, Logger, NotFoundException, Param, Post, Request, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { TopicsService } from 'src/topics/topics.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UserTypes } from 'src/users/users.types';
import { Roles } from 'src/auth/roles.decorator';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { EntryMedia } from './schema/entry-media.schema';
import { v4 as uuidv4 } from 'uuid';
import { ContentType } from './entries.types';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs/promises';
import { existsSync } from 'node:fs';

const AllowedMimeTypes = [
  'image/png',
  'image/jpeg',
  'text/plain'
];

@Controller('entries')
export class EntriesController {
  baseUrl = '';
  maxEntryFileSize = 0;
  hostname = '';

  constructor(
    private readonly entriesService: EntriesService,
    private readonly topicsService: TopicsService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = `${configService.get('MULTER_DEST')}/entries`
    this.maxEntryFileSize = parseInt(configService.get('MAX_ENTRY_FILE_SIZE'));
    this.hostname = configService.get('HOSTNAME');
  }


  private mapMimetypeToContentType(mimetype: string) {
    switch (mimetype) {
      case 'image/png':
      case 'image/jpeg':
        return ContentType.Image;
      case 'text/plain':
        return ContentType.Txt;
      default:
        throw new BadRequestException('Unknow way to conver a mimetype into a ContentType');
    }
  }

  @Get()
  findAll() {
    return this.entriesService.findAll();
  }

  @Get('mine')
  async getMyEntries(@Request() req: any) {
    const result = await this.entriesService.findAll({
      createdBy: req.user._id,
    });

    return result;
  }

  @Get(':id')
  findEntryById(@Param('id') id: string) {
    return this.entriesService.findOne(id);
  }

  @Roles(UserTypes.Creator)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Request() req: any,
    @Body() body: CreateEntryDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const topic = await this.topicsService.findById(body.topicId);
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    const media: EntryMedia[] = [];
    let invalidFileErrorMessage = '';

    body.urls?.forEach(url => {
      media.push({
        uuid: uuidv4(),
        url,
        type: ContentType.Video,
      });
    });


    Logger.log(files);
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      if (file.size > this.maxEntryFileSize) {
        invalidFileErrorMessage = `${file.originalname} exceeds file limit=${this.maxEntryFileSize}`;
        break;
      }

      if (!AllowedMimeTypes.includes(file.mimetype)) {
        Logger.log(file.mimetype);
        invalidFileErrorMessage = `Mimetype must be one of: [${AllowedMimeTypes.join()}]`;
        break;
      }

      const uuid = uuidv4();
      media.push({
        uuid,
        type: this.mapMimetypeToContentType(file.mimetype),
        url: `${this.hostname}/entry_files/${uuid}`,
        path: file.path,
      });
    }


    if (invalidFileErrorMessage) {
      files?.forEach(it => {
        const exists = existsSync(it.path);
        if (exists) {
          fs.unlink(it.path)
            .then(() => { })
            .catch(Logger.error);
        }
      });
      throw new BadRequestException(invalidFileErrorMessage);
    }

    return this.entriesService.create({
      ...body,
      topic,
      media,
      content: body.content || '',
      createdBy: req.user,
    });
  }
}
