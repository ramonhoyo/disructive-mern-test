import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserTypes } from "../users.types";

@Schema({
  timestamps: true,
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
