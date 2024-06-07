import {
  Body, Controller, FileTypeValidator, Get,
  Request,
  MaxFileSizeValidator, NotFoundException,
  Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors,
  StreamableFile,
  BadRequestException
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UserTypes } from 'src/users/users.types';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { createReadStream, existsSync, renameSync } from 'fs';
import { join } from 'path';
import { Public } from 'src/auth/public.decorator';

@Controller('topics')
@UseGuards(RolesGuard)
export class TopicsController {
  baseCoverPath: string;
  constructor(
    private readonly topicsService: TopicsService,
    private readonly configService: ConfigService,
  ) {
    this.baseCoverPath = configService.get('MULTER_DEST') + "/covers"
  }

  @Get()
  findAll() {
    return this.topicsService.findAll();
  }

  @Post()
  @Roles(UserTypes.Admin)
  @UseInterceptors(FileInterceptor('cover'))
  create(
    @Body() body: CreateTopicDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    ) file: Express.Multer.File
  ) {
    console.log(file);

    const ext = file.originalname.split('.')[1];
    if (!ext) {
      throw new BadRequestException('Invalid file type');
    }

    const newPath = this.baseCoverPath + "/" + file.filename + "." + ext.toLowerCase();
    renameSync(file.path, newPath);

    return this.topicsService.create({
      title: body.title,
      img: file.filename + "." + ext.toLowerCase(),
    });
  }


  @Get('covers/:cover')
  @Public()
  async getCover(@Request() req, @Param('cover') cover: string): Promise<StreamableFile> {
    const src = this.baseCoverPath + "/" + cover;
    if (!existsSync(join(this.baseCoverPath, cover))) {
      throw new NotFoundException('Cover not found');
    }
    const readStream = createReadStream(src);
    return new StreamableFile(readStream);
  }
}
