import { Prop } from "@nestjs/mongoose";

export class GetEntriesQueryDto {
  @Prop()
  title: string;
}
