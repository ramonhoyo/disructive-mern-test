import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Topic } from './schema/topic.schema';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(Topic.name)
    private readonly topicModel: Model<Topic>,
  ) { }

  create(body: Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.topicModel.create(body);
  }

  update(topic: Topic, data: Partial<Topic>) {
    return this.topicModel.findByIdAndUpdate(
      topic.id,
      data,
      { new: true },
    );
  }

  findAll() {
    return this.topicModel.find().populate('category');
  }

  findById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.topicModel.findById(id).populate('category');
  }
}
