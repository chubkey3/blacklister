import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// database fields
const port = parseInt(process.env.PORT || "5432")
const username = process.env.USERNAME || ""
const password = process.env.PASSWORD || ""
const database = process.env.DATABASE || ""

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: port,
      username: username,
      password: password,
      database: database,
      entities: [],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
