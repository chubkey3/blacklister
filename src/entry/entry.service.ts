import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entry } from './entry.entity';
import { toE164 } from 'src/util/e164';

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
  async addOne(phoneNumber: string): Promise<Entry | null> {
    const parsedPhoneNumber = toE164(phoneNumber);

    const existingRecord = await this.entryRepository.findOne({
      where: { phoneNumber: parsedPhoneNumber },
    });

    if (existingRecord) {
      return null;
    }

    const entry = this.entryRepository.create({
      phoneNumber: parsedPhoneNumber,
    });
    return this.entryRepository.save(entry);
  }

  async removeOne(phoneNumber: string): Promise<boolean> {
    const parsedPhoneNumber = toE164(phoneNumber);

    const existingRecord = await this.entryRepository.findOne({
      where: { phoneNumber: parsedPhoneNumber },
    });

    if (existingRecord) {
      this.entryRepository.remove(existingRecord);

      return true;
    } else {
      return false;
    }
  }

  // adds all phone numbers listed in csv file pointed to by URL to db
  addFromCSV(url: string) {
    fetch(url)
      .then(async (res) => {
        const data = await res.text();
        const phoneNumbers = data.split('\n');

        for (let i = 0; i < phoneNumbers.length; i++) {
          if (phoneNumbers[i].length > 0) {
            this.addOne(phoneNumbers[i]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
