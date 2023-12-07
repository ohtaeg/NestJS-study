import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 글로벌 class validation 적용
  app.useGlobalPipes(new ValidationPipe());
  // 글로벌 예외 필터 적용
  app.useGlobalFilters(new HttpExceptionFilter());

  // CORS 적용
  app.enableCors({
    // 누구나 다 접근 허용
    origin: true,
    credentials: true,
  });

  // swagger auth
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_USER_PASSWORD,
      },
    }),
  );

  // http://localhost:8000/media/cats/aaa.png
  // static 파일들을 제공하기 위한 미들웨어 등록
  // 해당 app은 useStaticAssets 사용할 수 없는데 expressApplication만 가능, 그래서 제네릭으로 선언해줘야함
  // NestFactory.create<NestExpressApplication>
  // /common 폴더 안에 /uploads 폴더를 의미
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    // static 파일들에 대한 url prefix
    prefix: '/media',
  });

  // swagger 적용
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
