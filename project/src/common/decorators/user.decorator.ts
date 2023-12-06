import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * https://docs.nestjs.com/custom-decorators
 * 매개변수 커스텀 데코레이터
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
