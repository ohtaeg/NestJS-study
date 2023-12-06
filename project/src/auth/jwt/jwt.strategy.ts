import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// passport-jwt 의 Strategy를 인자로 받았기 때문에 'jwt'로 인식
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 요청 헤더로부터 jwt 토큰을 추출한다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwt 파싱시 사용하는 비밀키, 인코딩 시크릿 키와 동일해야함
      secretOrKey: 'secretKey',
      // jwt 만료 시간
      ignoreExpiration: false,
    });
  }

  // async validate(payload) {}
}
