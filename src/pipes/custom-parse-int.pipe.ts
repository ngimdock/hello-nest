import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

/**
 * This is a custom @transformation pipe that transform a string to an integer
 */
@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metatype: ArgumentMetadata): number {
    console.log({ metatype });

    const val = parseInt(value, 10);

    if (isNaN(val)) throw new BadRequestException('Validation failed');

    return val;
  }
}
