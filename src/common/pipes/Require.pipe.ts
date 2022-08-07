import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class Require<T> implements PipeTransform<T, T | BadRequestException> {
  transform(payload: T): T | BadRequestException {
    if (!Object.keys(payload).length) {
      throw new BadRequestException('Payload should not be empty !');
    }
    return payload;
  }
}
