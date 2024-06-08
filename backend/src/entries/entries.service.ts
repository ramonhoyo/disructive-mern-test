import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Entry } from './schema/entry.schema';
import mongoose, { FilterQuery, Model } from 'mongoose';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(Entry.name)
    private readonly entryModel: Model<Entry>,
  ) { }

  create(body: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.entryModel.create(body);
  }

  findAll(filter?: FilterQuery<Entry>) {
    return this.entryModel.find(filter);
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.entryModel.findById(id);
  }

  update(id: string, body: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.entryModel.findByIdAndUpdate(id, body, { new: true });
  }
}
