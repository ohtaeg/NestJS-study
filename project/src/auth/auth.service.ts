import { CatsRepository } from './../cats/repository/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { Cat } from 'src/cats/cats.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginRequestDto) {
    // 비구조화 할당
    const { email, password } = data;

    // email로 조회
    const cat: Cat = await this.catsRepository.findCatByEmail(email);
    if (!cat) {
      throw new UnauthorizedException('이메일을 확인해주세요');
    }

    // password가 일치한지
    await this.checkEqualPassword(password, cat);

    // jwt 발급
    const payload = { email: email, sub: cat.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async checkEqualPassword(password: string, cat: Cat) {
    const isEqualsPassword: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isEqualsPassword) {
      throw new UnauthorizedException('비밀번호를 확인해주세요');
    }
  }
}
