import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 실행환경
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // error 타입이 string | object인데 string은 우리가 예외 발생시 넘겨준 메시지 인자값이고 object 인경우는 nest.js 자체에서 만들어주는 object이다.
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] }; // message가 배열 스트링으로 출력되는 경우도 있음

    // 우리가 던진 인자값이면
    if (typeof error === 'string') {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        success: false,
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        timestamp: new Date().toISOString(),
        success: false,
        ...error,
      });
    }
  }
}
