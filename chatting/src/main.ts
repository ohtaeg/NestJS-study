import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //* https://docs.nestjs.com/techniques/mvc
  /**
   * Express에게 정적 에셋을 public하게, view는 템플릿을 포함시키고, hbs 템플릿이 렌더링 엔진이다 라고 알려준다.
   * join() -> path라는 Node 모듈의 path.join()이다.
   * __dir -> 현재 directory를 뜻한다.
   * .. -> 상위 폴더를 뜻함, ../dir , src의 상위폴더인 chatting 프로젝트로 이동
   * public -> chatting 프로젝트의 public 폴더를 뜻함
   * views -> chatting 프로젝트의 views 폴더를 뜻함
   */
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT);
}
bootstrap();
