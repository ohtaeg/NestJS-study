import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
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
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  imgUrl: string;

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
