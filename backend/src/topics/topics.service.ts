import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic } from './schema/topic.schema';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(Topic.name)
    private readonly topicModel: Model<Topic>,
  ) { }


  create(body: Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>) {
    // some validation
    return this.topicModel.create(body);
  }

  findAll() {
    return this.topicModel.find();
  }
}
