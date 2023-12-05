import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // pre-controller
    console.log('Before...');

    const now = Date.now();
    // post controller
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`)),
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
