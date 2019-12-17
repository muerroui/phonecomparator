import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { PhoneService } from '../service/phone.service';
import { PhoneEntity } from '../entity/phone.entity';

@Controller('phones')
export class PhonesController {

    constructor(private service: PhoneService) { }

    @Get(':id')
    get(@Param() params) {
        return this.service.getPhone(params.id);
    }

    @Post()
    create(@Body() phone: PhoneEntity) {
        return this.service.createPhone(phone);
    }

    @Put()
    update(@Body() phone: PhoneEntity) {
        return this.service.updatePhone(phone);
    }

    @Delete(':id')
    deletePhone(@Param() params) {
        return this.service.deletePhone(params.id);
    }
}