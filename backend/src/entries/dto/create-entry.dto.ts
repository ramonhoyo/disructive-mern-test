import { IsArray, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateEntryDto {
  @IsString()
  topicId: string;

  @IsString()
  title: string;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  urls?: string[];

  @IsString()
  @IsOptional()
  content?: string;
}
