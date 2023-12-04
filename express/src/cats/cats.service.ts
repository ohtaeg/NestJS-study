import { Cat } from "./cats.model";
import { Request, Response } from "express";
import { ErrorStatus } from "error.status";

export const readAll = (req: Request, res: Response) => {
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
};

export const findCat = (req: Request, res: Response) => {
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
};

export const create = (req: Request, res: Response) => {
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
};
