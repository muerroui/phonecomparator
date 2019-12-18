import { Module } from '@nestjs/common';
import { PhoneService } from './service/phone.service';
import { PhoneController } from './controller/phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from './entity/phone.entity';
import { BrandController } from './controller/brand.controller';
import { BrandEntity } from './entity/brand.entity';
import { BrandService } from './service/brand.service';
import { PopulateController } from './controller/populate.controller';
import { scraperModule } from '../scraper/scraper.module';

@Module({
  providers: [PhoneService, BrandService],
  imports: [scraperModule, TypeOrmModule.forFeature([PhoneEntity, BrandEntity])],
  controllers: [PhoneController, BrandController, PopulateController],
  exports: [BrandService, PhoneService]
})
export class PhoneModule {}
