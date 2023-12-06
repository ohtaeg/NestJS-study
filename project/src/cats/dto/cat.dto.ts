import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// 필요한 데이터만 가져오기
// OmitType -> 필요 없는 데이터 제거하고 나머지 필드들을 가져온다.
export class ReadOnlyCat extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '1',
    description: 'id',
  })
  id: string;
}
