import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { SuccessResponseInterceptor } from 'src/common/interceptor/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCat } from './dto/cat.dto';

@Controller('cats')
// 인터셉터 DI
@UseInterceptors(SuccessResponseInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

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

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  getCurrentCat() {
    return 'current cat';
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
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
