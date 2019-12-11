
import { Get, Controller, Render, Param, Query } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as request from "request-promise-native";
import { PhoneController } from './phone.controller';

const URI = 'https://www.gsmarena.com';

@Controller('compare')
export class CompareController {

  @Get()
  @Render('compare')
  async root(@Query() query) {
    //const phone =  new PhoneController();
    //console.log('phone', phone.phone(query.phone1 + '.php'));
    //return {};

  }
}
