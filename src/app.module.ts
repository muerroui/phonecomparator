import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PhoneController } from './phone.controller';
import { AppService } from './app.service';
import { CompareController } from './compare.controller';

@Module({
  imports: [],
  controllers: [AppController, PhoneController, CompareController],
  providers: [AppService],
})
export class AppModule {}
