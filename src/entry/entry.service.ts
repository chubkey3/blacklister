
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entry } from './entry.entity';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
  ) {}

  // returns all blacklisted phone number entries from db
  findAll(): Promise<Entry[]> {
    return this.entryRepository.find();
  }

  // adds one blacklist entry to db with specified phone number
  addOne(phoneNumber: string): Promise<Entry> {
    const entry = this.entryRepository.create({ phoneNumber: phoneNumber});
    return this.entryRepository.save(entry);
  }
}
