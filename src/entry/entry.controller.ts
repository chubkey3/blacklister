import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Entry } from './entry.entity';
import { EntryService } from './entry.service';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';

class CreateDeleteEntryDto {
  @ApiProperty()
  phoneNumber: string;
}

class FromCSVEntryDto {
  @ApiProperty()
  url: string;
}

@Controller('blacklist')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get blacklisted phone numbers',
    description:
      'Returns JSON array of blacklisted phone number entries from database',
  })
  @ApiResponse({ status: 200, description: 'Succesfully retrieved entries!' })
  @ApiResponse({ status: 500, description: 'Internal Server Error!' })
  async findAll(): Promise<Entry[]> {
    try {
      return this.entryService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Blacklist individual phone number',
    description: 'Adds single phone number entry to database',
  })
  @ApiBody({ type: CreateDeleteEntryDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully blacklisted phone number!',
  })
  @ApiResponse({
    status: 409,
    description: 'Phone Number already blacklisted!',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error!' })
  async create(@Body() userData: CreateDeleteEntryDto): Promise<Entry> {
    const exists = await this.entryService.exists(userData.phoneNumber);

    if (exists) {
      throw new ConflictException('Phone Number is already in database!');
    }

    try {
      return this.entryService.addOne(userData.phoneNumber);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete()
  @ApiOperation({
    summary: 'Remove phone number from blacklist',
    description: 'Removes single phone number entry from database',
  })
  @ApiBody({ type: CreateDeleteEntryDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully unblacklisted phone number!',
  })
  @ApiResponse({ status: 409, description: 'Phone Number does not exist!' })
  @ApiResponse({ status: 500, description: 'Internal Server Error!' })
  async delete(@Body() userData: CreateDeleteEntryDto): Promise<Entry | void> {
    const exists = await this.entryService.exists(userData.phoneNumber);

    if (!exists) {
      throw new ConflictException('Phone Number is not in database!');
    }

    try {
      return this.entryService.removeOne(userData.phoneNumber);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('csv')
  @ApiOperation({
    summary: 'Blacklists batch of phone numbers',
    description:
      'Blacklists collection of phone numbers found in given csv file',
  })
  @ApiBody({ type: FromCSVEntryDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully blacklisted phone numbers!',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error!' })
  async createFromCSV(@Body() userData: FromCSVEntryDto) {
    try {
      return this.entryService.addFromCSV(userData.url);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
