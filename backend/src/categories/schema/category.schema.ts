import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ContentType } from "src/entries/entries.types";

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
export class Category {
  id: string;

  @Prop({ unique: true, required: true })
  name: string;


  @Prop({ type: [String], enum: ContentType, required: true })
  contentTypes: ContentType[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryDocument = HydratedDocument<Category>;
