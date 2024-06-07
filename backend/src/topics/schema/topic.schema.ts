import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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
export class Topic {
  id: string;

  @Prop({ unique: true, required: true })
  title: string;

  @Prop({ required: true })
  img: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
export type TopicDocument = HydratedDocument<Topic>;
