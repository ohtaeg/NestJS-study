// https://expressjs.com/en/starter/hello-world.html

import * as express from "express";
import { Cat } from "./cats/cats.model";
import catsRouter from "./cats/cats.router";

const app: express.Application = express();
const port: number = 8080;

/**
 * 중간에서, 개발자가 원하는 무언가를 할 수 있도록 하는 것, express 에서는 next() 가 있는 경우를 middleware 라고 한다.
 * 미들웨어는 순서가 중요하다.
 * 만약 미들웨어가 함수들 아래에 위치하게 되면 호출되지 않는다. express가 endpoint를 찾기 위해 위에서 top - bottom으로 찾기 때문
 * 그래서 라우터마다 미들웨어를 각각 다르게 적용하고 싶으면 중간중간 삽입한다.
 */
app.use((req, res, next) => {
  console.log("logging middle ware");
  next();
  console.log(res.sendDate);
});

// json middle ware
app.use(express.json());

// cats 라우터를 등록해준다.
app.use(catsRouter);

// 이것도 미들웨어이다. app.get("/cats/som")에 대한 미들웨어임
app.get("/cats/som", (req, res, next: express.NextFunction) => {
  console.log("only som middle ware");
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 * 에러 핸들링 미들 웨어
 */
app.use((req, res, next) => {
  console.log("error middle ware");
  res.send({ error: "404 not found" });
});
