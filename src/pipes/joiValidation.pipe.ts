import {
  PipeTransform,
  ArgumentMetadata,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

/**
 * This is a custom @validation pipe that uses joi to validate data
 * we bind this pipe to a controller method using the @UsePipes decorator so it is method-scoped
 */
@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error) throw new BadRequestException('Validation failed');

    return value;
  }
}
