import { CatRequestDto } from './../dto/cats.request.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../cats.schema';
import * as mongoose from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: mongoose.Model<Cat>,
    @InjectModel(Comments.name)
    private readonly commentsModel: mongoose.Model<Comments>,
  ) {}

  async existByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    if (result) {
      return true;
    }
    return false;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    return await this.catModel.findOne({ email });
  }

  async findByIdWithoutPassword(
    id: string | mongoose.Types.ObjectId,
  ): Promise<Cat | null> {
    // 여러 필드중 원하는 필드만 조회할 수 있고 제거할 수 있다. '-password'
    // 가지고오고 싶은 필드는 띄어쓰기로 구분한다 .select('email name')
    return await this.catModel.findById(id).select('-password');
  }

  async updateImg(id: any, imgUrl: string): Promise<Cat> {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = imgUrl;
    return await cat.save();
  }

  async findAll() {
    const result = await this.catModel
      .find()
      // 다른 document와 이어준다.
      .populate({ path: 'comments', model: this.commentsModel });

    return result;
  }
}
