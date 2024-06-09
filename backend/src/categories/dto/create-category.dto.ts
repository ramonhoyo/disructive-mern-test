import { ArrayMinSize, IsArray, IsEnum, IsString, MinLength } from "class-validator";
import { ContentType } from "src/entries/entries.types";

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsArray()
  @IsEnum(ContentType, { each: true })
  @ArrayMinSize(1)
  contentTypes: ContentType[];
}
