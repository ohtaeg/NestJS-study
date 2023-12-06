import { CatsRepository } from 'src/cats/repository/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';

// passport-jwt 의 Strategy를 인자로 받았기 때문에 'jwt'로 인식
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      // 요청 헤더로부터 jwt 토큰을 추출한다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwt 파싱시 사용하는 비밀키, 인코딩 시크릿 키와 동일해야함
      secretOrKey: process.env.JWT_SECRET_KEY,
      // jwt 만료 시간
      ignoreExpiration: false,
    });
  }

  // 라이브러리에서 자동으로 불러온다.
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findByIdWithoutPassword(payload.sub);
    if (!cat) {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }
    return cat; // request.user 안에 cat이 들어가게 된다.
  }
}
