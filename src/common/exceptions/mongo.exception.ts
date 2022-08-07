import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoServerError, MongoError } from 'mongodb';

@Catch(MongoError, MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    return new Error('Kec');
  }
}
