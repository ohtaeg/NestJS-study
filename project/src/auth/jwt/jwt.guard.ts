import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * @UseGuard(JwtAuthGuard) 가드로 데코레이팅된 컨트롤러가 실행되면
 * 1. JwtAuthGuard는 PassportStrategy를 상속받은 전략 클래스인 JwtStrategy를 찾는다. ("@nestjs/passport" 로직에 의해)
 * 2. JwtAuthGuard가 JwtStrategy를 찾을 수 있는 이유는
 *     2.1 JwtStrategy는 AuthModule의 provider에 등록이 되어 있고
 *     2.2 "@nestjs/passport"의 내부 로직에 의해 PassportStrategy를 상속받은 전략 클래스(JwtStrategy)를 자동으로 찾아냄
 *
 * AuthGuard - strategy를 자동으로 실행해줄 수 있음
 * AuthGuard("jwt") - jwt 유형의 AuthGuard
 * passport-jwt의 Strategy를 인자로 받은 PassportStrategy를 상속받은 JwtStrategy을 찾는 것
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
