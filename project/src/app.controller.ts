import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 모듈은 기본적으로 provider를 캡슐화한다. 즉, export를 하지 않은 모듈을 DI할 수 없다.
  // export를 하려면 cats.module.ts에서 가서 @Module() 내에 export를 해준다.
  // constructor(private readonly appService: AppService, private readonly catsService: CatsService) {}
  constructor(private readonly appService: AppService) {}
}
