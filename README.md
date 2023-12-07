# NestJS-study

## install n, nodemon

```shell
$ npm install -g n
$ n stable
$ npm install --global nodemon
```

## install express

```shell
$ cd express
$ npm i express
$ npm i @types/express -D
```

## install nest

```shell
$ npm install -g @nestjs/cli
$ nest new {projet-name}
```

## install mongoose

```shell
$ npm install --save @nestjs/mongoose mongoose
```

## install configure

```shell
$ npm i --save @nestjs/config
```

## install etc modules

```shell
// class-validator
$ npm i --save class-validator class-transformer

// bcrypt
$ npm i bcrypt
$ npm i -D @types/bcrypt

// swagger
$ npm install --save @nestjs/swagger

// Passport.js 는 Node.js를 위한 인증 미들웨어
// 아이디와 비밀번호를 사용해 로그인하는 방식을 포함해서, 구글, 페이스북, 트위터 등을 통한 여러가지 인증 방법을 제공
$ npm install --save @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local

// jwt
$ npm install --save @nestjs/jwt passport-jwt
$ npm install --save-dev @types/passport-jwt

// express basic auth (for swagger auth)
$ npm install express-basic-auth

// file upload, nest는 express multer 미들웨어 패키지 기반을 이용
$ npm i -D @types/multer

// s3 sdk
$ npm i aws-sdk @nestjs/config
```

## nest.js Request lifecycle

- [ref docs](https://docs.nestjs.com/faq/request-lifecycle)

0. 요청
1. middleware (미들웨어)
   - 요청과 응답 객체에 접근하여, 로깅, 인증, CORS 설정 등의 **공통 작업을 처리**
2. guards (가드)
   - 주로 permission (인증) 처리를 할 때 사용
3. pre-interceptors (인터셉터)
   - 주로 post-interceptor를 위한 변수 선언, 함수 실행을 한다. (선택)
4. Pipes (파이프)
   - 입력 데이터, 요청 바디를 원하는 형식으로 변환
   - 유효성 검사
5. Controller (컨트롤러)
   - 라우터 역할을 수행, 서비스 로직의 결과를 응답
6. Service (서비스)
   - 해당 요청에 대한 핵심 로직 수행
7. post-interceptor (인터셉터)
   - 주로 pre-interceptor 로직을 가지고 응답한 데이터를 가공하거나 전체 로직의 속도를 측정. 최종적으로 성공적인 응답 데이터를 보낸다.
8. exception filters (필터)
   - 예외 처리를 담당. 에러 메세지를 원하는 형태로 가공해서 응답.
9. 응답

- 이렇게 역할이 있는 레이어를 나눔으로써 로직을 레고처럼 맞춰서 사용할 수 있다. (AOP)
- 미들웨어에서 res.on("finish", ... )처럼 post-interceptor의 역할을 대신하거나 특정 로직으로 exception filter 대신에 사용할 수 있지만 네스트가 제공해준 역할에 맞게 각 레이어를 사용하면 책임을 분리하고 가독성 높고 확장성 있게 개발할 수 있다.
