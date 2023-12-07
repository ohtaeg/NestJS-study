import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { HydratedDocument, Document, Types } from 'mongoose';

export type CommentsDocument = HydratedDocument<Comments>;

// 스키마에 대한 옵션
const options: SchemaOptions = {
  // 디비에서 만들어질때마다 일자를 만들어준다.
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '댓글단 사람, cat id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats', // 어떤 document와 연결할 것인지
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    example: '고양이가 귀여워요',
    description: '댓글 내용',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 갯수',
    required: true,
  })
  @Prop({
    default: 0,
  })
  @IsNotEmpty()
  @IsPositive()
  likeCount: number;

  // 어떤 고양이에 댓글을 남겼는지
  @ApiProperty({
    description: '게시물',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

// 클래스를 스키마로 바꿔준다.
export const CommentsSchema = SchemaFactory.createForClass(Comments);
