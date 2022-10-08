import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './guards/roles.guard';
import { GlobalMiddleware } from './middlewares/global.middleware';
// import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(GlobalMiddleware);
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RolesGuard());

  await app.listen(5000);
}
bootstrap();
