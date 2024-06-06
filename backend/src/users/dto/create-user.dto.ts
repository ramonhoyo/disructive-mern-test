import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserTypes } from "../users.types";

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsEnum(UserTypes)
  type: UserTypes;
}
