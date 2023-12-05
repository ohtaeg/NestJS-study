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
