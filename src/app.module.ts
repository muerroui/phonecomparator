import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PhoneController } from './phone.controller';
import { AppService } from './app.service';
import { CompareController } from './compare.controller';
import { PhoneModule } from './phone/phone.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { scraperModule } from './scraper/scraper.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'api',
    //synchronize: true,
    entities: [__dirname + '/**/**/entity/**.entity{.ts,.js}'],
  }), PhoneModule, scraperModule],

  controllers: [AppController, PhoneController, CompareController],
  providers: [AppService],
})
export class AppModule {}
