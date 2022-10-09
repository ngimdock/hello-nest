import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CatsModule } from './cats/cats.module';
import { LoggerClassMiddleware } from './middlewares/logger.middleware-class';
import { LoggerFunctionalMiddleware } from './middlewares/logger.middleware-function';
import { CatsController } from './cats/cats.controller';
import { secondMiddleware } from './middlewares/second.middleware';
import { RolesGuard } from './guards/roles.guard';
import { LogginInterceptor } from './interceptors/loggin.interceptor';

@Module({
  imports: [CatsModule],
  providers: [
    // { provide: APP_GUARD, useClass: RolesGuard },
    // { provide: APP_INTERCEPTOR, useClass: LogginInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerClassMiddleware, secondMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.POST }, 'cats/(.*)')
      .forRoutes(CatsController);

    consumer
      .apply(LoggerFunctionalMiddleware)
      .exclude('otherPath(.*)')
      .forRoutes('otherPath');
  }
}
