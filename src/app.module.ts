import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Entry } from './entry/entry.entity';
import { EntryModule } from './entry/entry.module';

// configure .env variables for use
import 'dotenv/config'

// database fields
const host = process.env.DB_HOST || ""
const port = parseInt(process.env.DB_PORT || "5432")
const username = process.env.DB_USERNAME || ""
const password = process.env.DB_PASSWORD || ""
const database = process.env.DB_DATABASE || ""

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: host,
      port: port,
      username: username,
      password: password,
      database: database,
      entities: [Entry],
      synchronize: true
    }),
    EntryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
