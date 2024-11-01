import { ApiProperty } from '@nestjs/swagger';

export class FromCSVEntryDto {
  @ApiProperty()
  url: string;
}
