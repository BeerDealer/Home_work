import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: 'success',
          data: data,
        };
      }),
      catchError((err) => {
        return of({
          status: 'fail',
          data: err,
        });
      }),
    );
  }
}
