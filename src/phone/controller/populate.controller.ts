import { Controller, Post} from '@nestjs/common';
import { PhoneService } from '../service/phone.service';
import { BrandService } from '../service/brand.service';

@Controller('populate')
export class PopulateController {

    constructor(private phoneService: PhoneService,
                private brandService: BrandService) { }

    @Post()
    async populate() {
        await this.brandService.populateBrands();
        await this.phoneService.populatePhones();
    }
}