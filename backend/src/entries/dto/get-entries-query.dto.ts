import { IsOptional, IsString } from "class-validator";

export class GetEntriesQueryDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString({ each: true })
  @IsOptional()
  topics: string[];
}
