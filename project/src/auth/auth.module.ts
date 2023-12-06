import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // PassportModule - Strategy에 대한 기본 설정 가능, session - 세션, 쿠키 사용 여부
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      // jwt 토큰 발급시 사용하는 시크릿 키, 디코딩 시크릿 키와 동일해야함
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1y' },
    }),

    // 모듈간 순환 종속성 해결을 위한 유틸리티 함수, 양쪽에 선언해야함
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
