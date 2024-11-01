import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Default endpoint of NestJS project',
    description: 'Returns "Hello World!"',
  })
  @ApiResponse({ status: 200, description: 'Hello World!' })
  getHello(): string {
    return this.appService.getHello();
  }
}
