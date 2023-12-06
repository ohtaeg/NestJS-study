import { CatRequestDto } from './../dto/cats.request.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../cats.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

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
    const cat = await this.catModel.findOne({ email });
    return cat;
  }
}
