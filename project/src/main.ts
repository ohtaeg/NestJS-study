import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
