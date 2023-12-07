import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';
import { CatsRepository } from './repository/cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // CatSchema 스키마 등록
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),

    // 파일 업로드 모듈 등록
    MulterModule.register({
      // upload라는 폴더에 저장이 된다는 뜻
      dest: './upload',
    }),

    // 모듈간 순환 종속성 해결을 위한 유틸리티 함수, 양쪽에 선언해야함
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  // 공급자 등록(의존성 주입), 캡슐화 되어있어서 자기 자신 모듈만 사용가능하다.
  providers: [CatsService, CatsRepository],
  // 외부 모듈에서 필요한 의존성을 export한다면 다른 모듈은 provier에 작성할 필요가 없어진다.
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
