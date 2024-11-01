import { Controller, Get, Post, Body, Delete } from '@nestjs/common';

import { Entry } from './entry.entity';
import { EntryService } from './entry.service';

@Controller('blacklist')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Get()
  async findAll(): Promise<Entry[]> {
    return this.entryService.findAll();
  }

  @Post()
  async create(
    @Body() userData: { phoneNumber: string },
  ): Promise<Entry | null> {
    return this.entryService.addOne(userData.phoneNumber);
  }

  @Delete()
  async delete(@Body() userData: { phoneNumber: string }): Promise<boolean> {
    return this.entryService.removeOne(userData.phoneNumber);
  }

  @Post('csv')
  async createFromCSV(@Body() userData: { url: string }) {
    return this.entryService.addFromCSV(userData.url);
  }
}
