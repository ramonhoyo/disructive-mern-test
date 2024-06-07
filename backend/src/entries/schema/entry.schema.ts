import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Topic } from "src/topics/schema/topic.schema";
import { User } from "src/users/schemas/user.schema";

@Schema({
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id; 1
    },
  }
})
export class Entry {
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Topic" })
  topic: Topic;

  @Prop()
  url: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  createdBy: User;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);
export type EntryDocument = mongoose.Document & Entry;
