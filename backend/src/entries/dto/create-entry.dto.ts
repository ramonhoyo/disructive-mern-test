import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreateEntryDto {
  @IsString()
  topicId: string;

  @IsString()
  title: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
