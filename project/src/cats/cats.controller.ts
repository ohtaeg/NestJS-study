import { AuthService } from './../auth/auth.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { SuccessResponseInterceptor } from 'src/common/interceptor/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCat } from './dto/cat.dto';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Cat } from './cats.schema';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';

@Controller('cats')
// 인터셉터 DI
@UseInterceptors(SuccessResponseInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    /**
     * CatsController에서 AuthService를 사용하기 위해 CatModule에서 AuthModule을 import후
     * AuthMudole에서 캡슐화 된 AuthService를 외부 모듈인 CatModule에서 사용하기 위해 export 해줘야함
     */
    private readonly authService: AuthService,
  ) {}

  @Get('/wrong')
  wrong() {
    /**
     * nest.js에서는 http 에러에 대한 예외 인터페이스를 제공해준다.
     * https://docs.nestjs.com/exception-filters
     */
    // throw new HttpException('api is broken', HttpStatus.FORBIDDEN);

    /**
     * HttpException을 오버라이드 할 수 있다.
     */
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom error message',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('/wrong2')
  @UseFilters(HttpExceptionFilter)
  customException() {
    /**
     * 위 wrong에서 예외 구조가 반복되는 json구조다보니 메시지만 바꿔서 하고 싶은 경우 exception filter를 이용한다.
     * http-exception.filter.ts
     * https://docs.nestjs.com/exception-filters#exception-filters-1
     *
     * 필터를 등록하는 방법은 2가지이다.
     * 1. 라우터 각각 적용 or 클래스에 적용, @UseFilters
     * 2. 글로벌 적용
     *    main.ts에서 app.useGlobalFilters(new HttpExceptionFilter());
     */
    // 발생된 HttpException이 HttpExceptionFilter를 거쳐 Response에 전달된다.
    throw new HttpException('api is broken', HttpStatus.FORBIDDEN);
  }

  /**
   * 파라미터로 넘어오는 타입은 object이다.
   * pipe를 통해 특정 필드에 대한 타입 변환을 아래와 같이 할 수 있다.
   * ParseIntPipe - nest에서 제공하는 기본 pipe
   * PositiveIntPipe - 커스텀 파이프
   * 파이프를 여러개 받을 수 있다.
   */
  @Get(':id')
  findById(@Param('id', ParseIntPipe, PositiveIntPipe) id: number) {
    return { id };
  }

  // swagger api summary
  @ApiOperation({ summary: '회원가입' })
  // swagger response summary
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ReadOnlyCat,
  })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() body: LoginRequestDto) {
    return this.authService.login(body);
  }

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  // 가드를 통해 인증 처리, 인증 처리된 데이터를 가드가 반환해준다.
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData;
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  /**
   * https://docs.nestjs.com/techniques/file-upload#multiple-files
   * fieldName: 파일을 보유하는 HTML 양식의 필드 이름을 제공하는 문자열, 프론트 코드에서 image로 넘겨주고있어서 바꿈
   * maxCount : 요청당 최대 업로드 갯수
   * multerOptions : 업로드시 옵션, 유틸에 옵션을 만들어서 폴더에 저장하도록 함 (dist에)
   */
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  uploadCatImg(
    @CurrentUser() cat: Cat,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.catsService.upload(cat, files);
  }
}
