import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { GsmarenaService } from '../service/gsmarena.service';

@Controller('gsmarena')
export class GsmarenaController {

    constructor(private service: GsmarenaService) { }

    @Get('/brand')
    getBrands() {
        return this.service.getBrands();
    }

    @Get(':brand/phone')
    getPhonesOfBrand(@Param() params) {
        return this.service.getPhonesOfBrand(params.brand);
    }


    @Get('/phone/:phone')
    getPhone(@Param() params) {
        return this.service.getPhone(params.phone);
    }
}