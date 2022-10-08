import { Request, Response, NextFunction } from 'express';

export function secondMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //
  console.log('execute the second middleware');

  next();
}
