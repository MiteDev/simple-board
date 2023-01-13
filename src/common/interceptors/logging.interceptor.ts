import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from "@nestjs/common";
import { Observable, throwError, catchError, map, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Before...');

        const now = Date.now();
        return next
          .handle()
          .pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`))
          );
    }

}