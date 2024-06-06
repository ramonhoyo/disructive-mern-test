import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { HttpStatus } from '@nestjs/common';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    switch (exception.code) {
      case 11000:
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: 'entity already exists.',
        });
        break;
      case 11001:
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'invalid params',
        });
        break;
      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Internal error.',
        });
    }
  }
}
