import { Request, Response, NextFunction } from 'express';

export function LoggerFunctionalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('execute function middleware');
  next();
}
