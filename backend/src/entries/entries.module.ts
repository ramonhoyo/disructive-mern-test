import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Entry, EntrySchema } from './schema/entry.schema';
import { TopicsModule } from 'src/topics/topics.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Entry.name, schema: EntrySchema }
    ]),
    TopicsModule,
  ],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule { }
