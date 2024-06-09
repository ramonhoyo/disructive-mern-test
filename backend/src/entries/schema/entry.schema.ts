import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Topic } from "src/topics/schema/topic.schema";
import { User } from "src/users/schemas/user.schema";
import { EntryMedia, EntryMediaSchema } from "./entry-media.schema";

@Schema({
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id;
      ret.createdBy = {
        username: ret.createdBy.username,
      };
    },
  }
})
export class Entry {
  id: string;

  @Prop({ unique: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Topic" })
  topic: Topic;

  @Prop()
  content: string;

  @Prop({ type: [EntryMediaSchema] })
  media: EntryMedia[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: User.name,
    required: true,
    unique: false,
  })
  createdBy: User;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);
export type EntryDocument = mongoose.Document & Entry;
