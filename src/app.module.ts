import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PhoneController } from './phone.controller';
import { AppService } from './app.service';
import { CompareController } from './compare.controller';
import { PhoneModule } from './phone/phone.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), PhoneModule],
  controllers: [AppController, PhoneController, CompareController],
  providers: [AppService],
})
export class AppModule {}


