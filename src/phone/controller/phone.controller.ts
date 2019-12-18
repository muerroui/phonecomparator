import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { PhoneService } from '../service/phone.service';
import { PhoneEntity } from '../entity/phone.entity';

@Controller('phone/v2')
export class PhoneController {

    constructor(private service: PhoneService) { }

    @Get()
    get() {
        return this.service.getPhones();
    }

    @Get(':id')
    getById(@Param() params) {
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