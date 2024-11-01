import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entry } from './entry.entity';
import { toE164 } from 'src/util/e164';
import { CSVResponse } from 'src/types/CSVResponse';


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

  // checks if phoneNumber exists in database
  async exists(phoneNumber: string): Promise<boolean> {
    const parsedPhoneNumber = toE164(phoneNumber);

    const existingRecord = await this.entryRepository.findOne({
      where: { phoneNumber: parsedPhoneNumber },
    });

    if (existingRecord) {
      return true;
    }

    return false;
  }

  // adds one blacklist entry to db with specified phone number
  async addOne(phoneNumber: string): Promise<Entry> {
    const parsedPhoneNumber = toE164(phoneNumber);

    const entry = this.entryRepository.create({
      phoneNumber: parsedPhoneNumber,
    });
    return this.entryRepository.save(entry);
  }

  // removes blacklist entry from db with specified phone number
  async removeOne(phoneNumber: string): Promise<Entry | void> {
    const parsedPhoneNumber = toE164(phoneNumber);

    const existingRecord = await this.entryRepository.findOne({
      where: { phoneNumber: parsedPhoneNumber },
    });

    if (existingRecord) {
      return this.entryRepository.remove(existingRecord);
    }
  }

  async addFromCSVURL(url: string): Promise<CSVResponse> {
    try {
      let response = await fetch(url);
      const content = await response.text();
      return this.addFromCSV(content);
    } catch (error) {
      throw new BadRequestException(error);
    }
    

  }

  async addFromCSVFile(file: Express.Multer.File): Promise<CSVResponse> {
    try {
      let content = file.buffer.toString('utf-8');

      return this.addFromCSV(content);
    } catch (error) {
      throw new BadRequestException(error);
    }
    
    
    
  }
  
  // adds all phone numbers listed in csv file pointed to by URL to db
  async addFromCSV(csvString: string): Promise<CSVResponse> {
    
        let entriesAdded = 0;
        let numEntries = await this.entryRepository.count();
        
        const phoneNumbers = csvString.split('\n');

        for (let i = 0; i < phoneNumbers.length; i++) {
          if (phoneNumbers[i].length > 0) {
            const exists = await this.exists(phoneNumbers[i]);
            if (!exists) {
              this.addOne(phoneNumbers[i]);
              entriesAdded = entriesAdded + 1;
            }
          }
        }          
        
        return { status: 200, entriesAdded: entriesAdded, numEntries: numEntries}
  }

  
}
