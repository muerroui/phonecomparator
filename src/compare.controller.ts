
import { Get, Controller, Render, Query, Param, NotFoundException, Res } from '@nestjs/common';
import { PhoneController } from './phone.controller';
import { AppController } from './app.controller';
import {GSMARENA_ATTRIBUTES_MAPPING} from './constants/gsmarenaMapping.constant';
import { get } from 'lodash';
import { PhoneEntity } from './phone/entity/phone.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandService } from './phone/service/brand.service';
import { PhoneService } from './phone/service/phone.service';


@Controller('compare')
export class CompareController {

  constructor(private service: BrandService, private phoneService: PhoneService) { }

  @Get(':id')
  @Render('compare')
  async get(@Param('id') compareIds, @Res() res) {
    const phoneIds = compareIds.split('-vs-');
    if (phoneIds.length < 2) {
      res.render('custom/404', {Notfooter: true});
     // throw new NotFoundException(`Number of phones two compare must be at least two`);
    }
    const phoneController = new PhoneController(this.service, this.phoneService);
    let phones = [];
    if (phoneIds[0]) {
     phones.push(await phoneController.phone(phoneIds[0] + '.php'));
    }
    if (phoneIds[1]) {
      phones.push(await phoneController.phone(phoneIds[1] + '.php'));
    }
    if (phoneIds[2]) {
      phones.push(await phoneController.phone(phoneIds[2] + '.php'));
    }
    const appController = new AppController(this.service);
    if (phones.length === 0) {
        return await appController.root();
    }
    phones = phones.map(phone =>
      Object.keys(GSMARENA_ATTRIBUTES_MAPPING).reduce((object, mainMetric) =>
        Object.assign(object, {
          [mainMetric]: Object.keys(GSMARENA_ATTRIBUTES_MAPPING[mainMetric])
          .reduce((object, subMetric) => Object.assign(object,
            {[subMetric]: (get(this.formatSpecs(phone.spec_detail), GSMARENA_ATTRIBUTES_MAPPING[mainMetric][subMetric].field) || '_').replace(/[^\x00-\x7F]/g) })
          ,{})
        }), {title: phone.title, img: phone.img, amazon: this.amazonUrl(phone.title)}));
    return {phones};
  }

  formatSpecs(specs) {
    return specs.reduce((result, item) => {
      result[item.category.replace(/\s/g, "")] = item.specs.reduce(function (result, item, index) {
        if (item.name.replace(/\s/g, "").length === 0) {
          result["" + index] = item.value;
        } else {
          result[item.name.replace(/\s/g, "")] = item.value;
        }
        return result;
      }, {});
      return result;
    }, {});
  }

  amazonUrl(phone) {
   return `https://www.amazon.com/s?k=${phone.split(' ')[0] || ''}&amp;
          i=electronics-intl-ship&amp;bbn=16225009011&amp;rh=n%3A%2116225009011%2Cn%3A2811119011&amp;dc&amp;
          linkCode=ll2&amp;linkId=34240874f7b6f3db97ff787ec54a2d49&amp;qid=1570290013&amp;rnid=16225009011&amp;
          tag=system959-20&amp;ref=sr_nr_n_4'`;
  }

}
