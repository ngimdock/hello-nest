import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  ValidationPipe,
  Scope,
} from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CatsModule } from './cats/cats.module';
import { LoggerClassMiddleware } from './middlewares/logger.middleware-class';
import { LoggerFunctionalMiddleware } from './middlewares/logger.middleware-function';
import { CatsController } from './cats/cats.controller';
import { secondMiddleware } from './middlewares/second.middleware';
import { RolesGuard } from './guards/roles.guard';
import { LogginInterceptor } from './interceptors/loggin.interceptor';
import {
  ASYNC_CONNEXION,
  CONFIG,
  CONNECTION,
  DEVELOPMENT,
} from './constants/constants';

//  Non-class-based provider tokens
const connexion = {
  connect: () => {
    console.log('Connected to the database');
  },
};

// Class providers
// The useClass syntax allows you to dynamically determine a class that a token should resolve to
const ConfigService = {};
const DevConfigService = {};
const ProdConfigService = {};

const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === DEVELOPMENT ? DevConfigService : ProdConfigService,
};

// Non-service based providers
// provider is not only use to supply services
const devConfig = {};
const prodConfig = {};

const configFactory = {
  provide: CONFIG,
  useFactory: () => {
    return process.env.NODE_ENV === DEVELOPMENT ? devConfig : prodConfig;
  },
};

// Asynchronous providers

const createConnexion = () => {
  console.log('connexion to the database');
};
const connectToDatabaseFactory = {
  provide: ASYNC_CONNEXION,
  useFactory: async () => {
    const connexion = await createConnexion();
    return connexion;
  },
};

@Module({
  imports: [CatsModule],
  providers: [
    connectToDatabaseFactory,
    { provide: APP_GUARD, useClass: RolesGuard },
    // { provide: APP_INTERCEPTOR, useClass: LogginInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: CONNECTION, useValue: connexion },
    // configServiceProvider,
    configFactory,
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
