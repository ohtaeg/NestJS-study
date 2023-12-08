import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('index')
  index() {
    return {
      data: {
        title: '이건 타이틀',
        copyRight: '태태태',
      },
    };
  }
}
