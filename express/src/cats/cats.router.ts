import { Cat } from "./cats.model";
import { ErrorStatus } from "error.status";
import { Router } from "express";

// 라우터 분리를 위해 라우터 인스턴스를 만들고 라우터들을 등록한다.
const router = Router();

// 고양이 전체 데이터 조회
router.get("/cats", (req, res) => {
  try {
    // throw new Error("db connect error, sorry");
    const cats = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error: any) {
    const err: ErrorStatus = error as ErrorStatus;
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

// 특정 고양이 데이터 조회
router.get(`/cat/:name`, (req, res) => {
  try {
    const cat = Cat.find((cat) => {
      return cat.name === req.params.name;
    });

    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error: any) {
    const err: ErrorStatus = error as ErrorStatus;
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

router.get("/cats/som", (req, res) => {
  res.send({ som: Cat[1] });
});

// 고양이 추가
router.post(`/cat`, (req, res) => {
  try {
    const payload = req.body;
    // body를 출력해보면 undefined가 나온다.
    // express에서는 body를 읽기 위해선 미들웨어를 추가해줘야한다.
    console.log(payload);
    Cat.push(payload);

    res.status(200).send({
      success: true,
      data: {
        payload,
      },
    });
  } catch (error: any) {
    const err: ErrorStatus = error as ErrorStatus;
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

// 고양이 업데이트
router.put(`/cats/:name`, (req, res) => {
  try {
    const payload = req.body;
    const name = req.params.name;

    let result;
    Cat.forEach((cat) => {
      if (cat.name === name) {
        cat = payload;
        result = cat;
      }
    });

    res.status(200).send({
      success: true,
      data: {
        result,
      },
    });
  } catch (error: any) {
    const err: ErrorStatus = error as ErrorStatus;
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

// 고양이 데이터 부분 업데이트
router.patch(`/cats/:name`, (req, res) => {
  try {
    const payload = req.body;
    const name = req.params.name;

    let result;
    Cat.forEach((cat) => {
      if (cat.name === name) {
        // 구조분해 할당, 중복된 키는 바꿔준다.
        cat = { ...cat, ...payload };
        result = cat;
      }
    });

    res.status(200).send({
      success: true,
      data: {
        result,
      },
    });
  } catch (error: any) {
    const err: ErrorStatus = error as ErrorStatus;
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

// 고양이 삭제
router.delete(`/cats/:name`, (req, res) => {
  try {
    const name = req.params.name;
    const newCats = Cat.filter((cat) => cat.name !== name);

    res.status(200).send({
      success: true,
      data: {
        newCats,
      },
    });
  } catch (error: any) {
    const err: ErrorStatus = error as ErrorStatus;
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

// 등록된 라우터를 내보낸다.
export default router;
