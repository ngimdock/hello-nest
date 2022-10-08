import {
  PipeTransform,
  ArgumentMetadata,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/**
 * This is a custom @validation pipe that uses class-validator to validate data
 * we bind this pipe to a parametter of a controller method so it is parametter-scoped
 * we can use this at global scope by using app.useGlobalPipes(new ValidationPipe()) or pass this as propertie array in any module file
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const message = errors
        .map((err) => Object.values(err.constraints))
        .join(', ');
      throw new BadRequestException(message);
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
