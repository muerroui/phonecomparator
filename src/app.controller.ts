
import { Get, Controller, Render } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as request from "request-promise-native";
import { BrandService } from './phone/service/brand.service';

const URI = 'https://www.gsmarena.com';

@Controller()
export class AppController {

  constructor(private service: BrandService) { }

  @Get()
  @Render('index')
  async root() {
    return { brands: await this.service.getBrands()};
  }
}
