import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TcpLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();
    const handler = context.getHandler();
    const hadnlerName = handler.name;

    const args = context.getArgs();
    const param = args[0];
    const processId = param.processId;

    Logger.log(
      `TCP >> Start process "${processId} >> method: ${hadnlerName} at ${now} >> param: ${JSON.stringify(param)}`,
    );

    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(`TCP >> End process "${processId} >> method: ${hadnlerName} >> after: ${Date.now() - now}ms`),
        ),
      );
  }
}
