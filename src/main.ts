
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import exphbs = require('express-handlebars');
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.engine( 'hbs', exphbs( {
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, '..', '/views/layouts/'),
    partialsDir:  join(__dirname, '..', '/views/partials/'),
    BaseViewsDir: join(__dirname, '..', 'views')
  } ) );

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.set( 'view engine', 'hbs' );

  await app.listen(3000);
}
bootstrap();