import { IsMongoId, IsString } from "class-validator";

export class CreateTopicDto {
  @IsString()
  title: string;

  @IsMongoId()
  categoryId: string;
}
