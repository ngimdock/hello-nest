import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor() {
    super('Unauthorized custom exception', HttpStatus.UNAUTHORIZED);
  }
}
