import { Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  getPost() {
    return this.appService.postHello()
  }

  @Put()
  getPut() {
    return 'Desde @Put'
  }

  @Patch()
  getPatch() {
    return 'Desde @Patch'
  }
}
