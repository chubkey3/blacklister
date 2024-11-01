import { ApiProperty } from "@nestjs/swagger";

export class CreateDeleteEntryDto {
    @ApiProperty()
    phoneNumber: string;
}