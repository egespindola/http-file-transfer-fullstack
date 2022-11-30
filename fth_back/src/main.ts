import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.APP_PORT);
  console.log('\x1b[36m%s\x1b[0m', `Server started on port ${process.env.APP_PORT}`); 
}
bootstrap();
