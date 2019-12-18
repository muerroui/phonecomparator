import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { BrandService } from '../service/brand.service';
import { BrandEntity } from '../entity/brand.entity';

@Controller('brand/v2')
export class BrandController {

    constructor(private service: BrandService) { }

    @Get()
    get() {
        return this.service.getBrands();
    }

    @Get(':id')
    getById(@Param() params) {
        return this.service.getBrand(params.id);
    }

    @Post()
    create(@Body() brand: BrandEntity) {
        return this.service.createBrand(brand);
    }

    @Put()
    update(@Body() brand: BrandEntity) {
        return this.service.updateBrand(brand);
    }

    @Delete(':id')
    deleteBrand(@Param() params) {
        return this.service.deleteBrand(params.id);
    }
}