import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserTypes } from "../users.types";

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
export class User {
  id: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;


  @Prop({ enum: UserTypes })
  type: UserTypes;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
