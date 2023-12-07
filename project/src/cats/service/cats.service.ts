import { CatsRepository } from '../repository/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcript from 'bcrypt';
import { Cat } from '../cats.schema';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException(
        `해당하는 고양이는 이미 존재합니다. ${name}`,
      );
    }

    const hashedPassword = await bcript.hash(password, 10);
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async upload(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    const updateCat = await this.catsRepository.updateImg(cat.id, fileName);
    return updateCat.readOnlyData;
  }
}
