import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  getHello(@Req() req: Request, @Body() body, @Param() param): string {
    console.log(req);
    console.log(body);
    console.log(param);
    return this.appService.getHello();
  }
}
