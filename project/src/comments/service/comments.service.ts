import { CatsRepository } from './../../cats/repository/cats.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../dto/comments.dto';
import { Model } from 'mongoose';
import { Comments } from '../comments.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, dto: CommentsCreateDto) {
    try {
      const targetCat = await this.catsRepository.findByIdWithoutPassword(id);
      const { contents, author } = dto;

      const validatedAuthor =
        await this.catsRepository.findByIdWithoutPassword(author);

      const newComment = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {}
  }
}
