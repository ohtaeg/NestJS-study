import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';

@Module({
  // CatSchema 스키마 등록
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService],
  // 다른 모듈에서 필요한 컴포넌트를 export한다면 다른 모듈은 provier에 작성할 필요가 없어진다.
  exports: [CatsService],
})
export class CatsModule {}
