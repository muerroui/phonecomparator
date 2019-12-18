import { Module } from '@nestjs/common';
import {GsmarenaService } from './service/gsmarena.service';
import { GsmarenaController } from './controller/gsmarena.controller';

@Module({
  providers: [GsmarenaService],
  exports: [GsmarenaService],
  controllers: [GsmarenaController],
})
export class scraperModule {}
