import { Module } from '@nestjs/common';
import { PhoneService } from './service/phone.service';
import { PhoneController } from 'src/phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entity/phone.entity';

@Module({
  providers: [PhoneService],
  imports: [TypeOrmModule.forFeature([Phone])],
  controllers: [PhoneController],
})
export class PhoneModule {}
