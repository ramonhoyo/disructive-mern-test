import { IsEmail, IsString } from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  role: string;
}
