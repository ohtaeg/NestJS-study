import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, Document } from 'mongoose';

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

  @Prop()
  imgUrl: string;

  /**
   * cat.readOnlyData를 하는 순간,
   * mongoose에서 @Prop이 없으므로 virtual field라는 것을 인식하고
   * 아래와 같은 해당 스키마에서 정의되어 있는 virtual method를 찾아 리턴
   */
  readonly readOnlyData: { id: string; email: string; name: string };
}

// 클래스를 스키마로 바꿔준다.
export const CatSchema = SchemaFactory.createForClass(Cat);
// 클라이언트한테 보여줄 데이터를 지정한다.
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
