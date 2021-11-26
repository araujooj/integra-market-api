import { Request, Response, NextFunction } from 'express';

export default function Paginator(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  let { perPage, page } = req.query;
  let realPage: number;
  let realTake: number;

  if (perPage) realTake = +perPage;
  else {
    perPage = '10';
    realTake = 10;
  }
  if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
  else {
    realPage = 0;
    page = '1';
  }

  req.pagination = {
    realPage,
    realTake,
  };

  return next();
}
