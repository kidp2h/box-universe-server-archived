import { BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose';

const ValidationError = Error.ValidationError;

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: Error.ValidationError) {
    const listErrors = Object.keys(exception.errors).map((key: string) => {
      return {
        field: key,
        message: exception.errors[key].message,
      };
    });
    return new BadRequestException(listErrors, 'ValidationError');
  }
}
