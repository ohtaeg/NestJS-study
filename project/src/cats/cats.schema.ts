import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, Document } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

export type CatDocument = HydratedDocument<Cat>;

// 스키마에 대한 옵션
const options: SchemaOptions = {
  // 디비에서 만들어질때마다 일자를 만들어준다.
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  // swagger request body summary
  @ApiProperty({
    example: 'asdf@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'blue',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '!asdfsdf@w112',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default:
      'https://github.com/amamov/NestJS-solid-restapi-boilerplate/raw/main/docs/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  /**
   * cat.readOnlyData를 하는 순간,
   * mongoose에서 @Prop이 없으므로 virtual field라는 것을 인식하고
   * 아래와 같은 해당 스키마에서 정의되어 있는 virtual method를 찾아 리턴
   */
  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

// 클래스를 스키마로 바꿔준다.
export const _CatSchema = SchemaFactory.createForClass(Cat);
// 클라이언트한테 보여줄 데이터를 지정한다.
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  // ref: 스키마 이름 (참조할 collections), Cat.comments 필드에 comments 스키마를 가져올 것이다.
  ref: 'comments',
  localField: '_id', // 현재 스키마에 선언되어 있는 참조할 필드
  foreignField: 'info', // collections에서 참조할 필드, A라는 id인 고양이에 달린 코멘트들을 다 가져오겠다.
  // justOne: true, // 하나만 반환하는지 여부
});
_CatSchema.set('toObject', { virtuals: true }); // 객체로 변환 가능하도록
_CatSchema.set('toJSON', { virtuals: true }); // JSON으로 변환 가능하도록
