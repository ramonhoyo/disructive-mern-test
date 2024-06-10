import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ContentType } from "../entries.types";

@Schema({
  _id: false,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.path;
    }
  }
})
export class EntryMedia {
  @Prop()
  uuid: string;

  @Prop({ enum: ContentType })
  type: ContentType;

  @Prop()
  url: string;

  @Prop({ required: false })
  path?: string;

  @Prop()
  originalName: string;

  fileSize: number;
}

export const EntryMediaSchema = SchemaFactory.createForClass(EntryMedia);
