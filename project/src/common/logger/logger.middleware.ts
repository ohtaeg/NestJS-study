import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * nest.js의 미들웨어는 express의 미들웨어와 동일하다.
 * 순서도 중요하며 인젝션이 가능하다.
 *
 * 미들웨어 적용은 @Module 데코레이터는 적용할 수 없다.
 * NestModule 인터페이스를 구현한 모듈 클래스의 configure() 메서드를 사용하여 적용한다.
 * https://docs.nestjs.com/middleware#applying-middleware
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${req.ip}, ${req.method}, ${req.originalUrl}`);
    // 응답 마지막에 로깅을 하고 싶으면 finish 이벤트에 로깅 함수 이벤트 등록
    res.on('finish', () => {
      this.logger.log(res.statusCode);
    });
    next();
  }
}
