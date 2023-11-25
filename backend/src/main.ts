import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    (
      req: any,
      res: { header: (arg0: string, arg1: string) => void },
      next: () => void,
    ) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
      next();
    },
  );
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  await app.listen(3333);
}
bootstrap();
