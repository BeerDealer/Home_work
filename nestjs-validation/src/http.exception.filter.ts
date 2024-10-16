import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus() || 500;
    const data = exception.getResponse();

    response.status(status).json({
      timestamp: new Date().toString(),
      status: 'fail',
      data: data,
      code: status,
    });
  }
}
