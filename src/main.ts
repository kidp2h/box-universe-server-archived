import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
// import * as csurf from 'csurf';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as os from 'os';
import { MongoExceptionFilter } from '@exceptions/mongo.exception';

declare const module: any;

async function bootstrap() {
  const cpus = os.cpus().length;
  console.log(cpus);
  process.env.UV_THREADPOOL_SIZE = cpus.toString();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );
  bodyParser.urlencoded({ extended: false });
  app.use(cookieParser());
  app.use(
    session({
      secret: 'your-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  // app.use(csurf({ cookie: true }));
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
