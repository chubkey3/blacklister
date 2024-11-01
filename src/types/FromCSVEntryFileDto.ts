import { ApiProperty } from '@nestjs/swagger';

export class FromCSVEntryFileDto {
  @ApiProperty()
  file: FormData;
}
