import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Entry } from './schema/entry.schema';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { EntryMedia } from './schema/entry-media.schema';
import { Topic } from 'src/topics/schema/topic.schema';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(Entry.name)
    private readonly entryModel: Model<Entry>,
  ) { }

  private validateUploadingMedia(media: EntryMedia[], topic: Topic) {
    const { category } = topic;
    const contentTypeList = new Set();
    category.contentTypes.forEach(it => contentTypeList.add(it))

    let errorMessage = '';

    for (const item of media) {
      if (!contentTypeList.has(item.type)) {
        errorMessage = `Invalid content type (${item.type}) for category. expected = ${[...contentTypeList.values()]}`;
        break;
      }
    }

    if (errorMessage) {
      // TODO: remove stored files;
      throw new BadRequestException(errorMessage);
    }
  }

  create(
    body: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>
  ) {
    Logger.log(body)
    this.validateUploadingMedia(body.media, body.topic);
    return this.entryModel.create(body);
  }

  findAll(filter?: FilterQuery<Entry>) {
    return this.entryModel
      .find(filter, null, { sort: { createdAt: -1 } })
      .populate(['createdBy', 'topic'])
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.entryModel.findById(id).populate('createdBy');
  }

  update(id: string, body: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.entryModel.findByIdAndUpdate(id, body, { new: true }).populate('createdBy');
  }

  findOneByMediaUuid(uuid: string) {
    return this.entryModel.findOne({ 'media.uuid': uuid }).populate('createdBy');
  }

  async getEntriesCountByTopic() {
    const result = await this.entryModel.aggregate([
      {
        $group: {
          _id: '$topic',
          entriesCount: { $sum: 1 }
        }
      },
      {
        $project: {
          topicId: '$_id',
          entriesCount: 1,
          _id: 0
        }
      }
    ]);
    return result;
  }
}
