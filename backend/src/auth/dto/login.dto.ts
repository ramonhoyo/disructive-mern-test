import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/schemas/user.schema";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  usernameOrEmail: string;
}

export class LoginResponseDto {
  token: string;

  user: User;
}
