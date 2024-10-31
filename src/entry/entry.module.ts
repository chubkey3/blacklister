
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Entry } from './entry.entity';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  providers: [EntryService],
  controllers: [EntryController],
})
export class EntryModule {}
