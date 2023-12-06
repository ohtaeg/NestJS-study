import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';
import { CatsRepository } from './repository/cats.repository';

@Module({
  // CatSchema 스키마 등록
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  // 공급자 등록
  providers: [CatsService, CatsRepository],
  // 외부 모듈에서 필요한 의존성을 export한다면 다른 모듈은 provier에 작성할 필요가 없어진다.
  exports: [CatsService],
})
export class CatsModule {}
