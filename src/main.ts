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
  process.env.UV_THREADPOOL_SIZE = cpus.toString();
  console.log(process.env.TIME_EXPIRE_ACCESS_TOKEN);

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
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  // app.use(csurf({ cookie: true }));
  await app.listen(process.env.PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
