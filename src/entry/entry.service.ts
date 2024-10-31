
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entry } from './entry.entity';
import { toE164 } from 'src/util/e164';
import { error } from 'console';

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
    const entry = this.entryRepository.create({ phoneNumber: toE164(phoneNumber)});
    return this.entryRepository.save(entry);
  }

  // adds all phone numbers listed in csv file pointed to by URL to db
  addFromCSV(url: string) {
    fetch(url).then(async (res) => {
        let data = await res.text();
        let phoneNumbers = data.split('\n');
        
        for (let i = 0; i < phoneNumbers.length; i++) {
            if (phoneNumbers[i].length > 0) {
                this.addOne(phoneNumbers[i]);
            }
        }        

    }).catch((error) => {
        console.log(error);
    });
  }
}
