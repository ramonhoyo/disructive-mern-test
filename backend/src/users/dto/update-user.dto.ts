import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserTypes } from "../users.types";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsEnum(UserTypes)
  @IsOptional()
  type: UserTypes;
}
