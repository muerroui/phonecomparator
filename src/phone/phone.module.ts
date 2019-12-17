import { Module } from '@nestjs/common';
import { PhoneService } from './service/phone.service';
import { PhoneController } from 'src/phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from './entity/phone.entity';

@Module({
  providers: [PhoneService],
  imports: [TypeOrmModule.forFeature([PhoneEntity])],
  controllers: [PhoneController],
})
export class PhoneModule {}
