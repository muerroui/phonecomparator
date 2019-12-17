import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import exphbs = require('express-handlebars');
import { join } from 'path';
import { AppModule } from './app.module';
import { ErrorFilter } from './filters/error.filter';
import { helpersHds } from './helpers/handlebars.helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.engine(
    'hbs',
    exphbs({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: join(__dirname, '..', '/views/layouts/'),
      partialsDir: join(__dirname, '..', '/views/partials/'),
      BaseViewsDir: join(__dirname, '..', 'views'),
      helpers: { ...helpersHds },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.set('view engine', 'hbs');

  app.useGlobalFilters(new ErrorFilter());

  await app.listen(3000);
}
bootstrap();
