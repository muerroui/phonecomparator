
import { Get, Controller, Render, Query } from '@nestjs/common';
import { PhoneController } from './phone.controller';
import { AppController } from './app.controller';
import {gsmarenaMapping} from './constants/gsmarenaMapping.constant';
import { get } from 'lodash';



@Controller('compare')
export class CompareController {

  @Get()
  @Render('compare')
  async root(@Query() query) {
    const phoneController = new PhoneController();
    let phones = [];
    if (query.phone1) {
     phones.push(await phoneController.phone(query.phone1 + '.php'));
    }
    if (query.phone2) {
      phones.push(await phoneController.phone(query.phone2 + '.php'));
    }
    if (query.phone3) {
      phones.push(await phoneController.phone(query.phone3 + '.php'));
    }
    const appController = new AppController();
    if (phones.length === 0) {
        return await appController.root();
    }
    phones = phones.map(phone =>
      Object.keys(gsmarenaMapping).reduce((object, mainMetric) =>
        Object.assign(object, {
          [mainMetric]: Object.keys(gsmarenaMapping[mainMetric])
          .reduce((object, subMetric) => Object.assign(object,
            {[subMetric]: (get(this.formatSpecs(phone.spec_detail), gsmarenaMapping[mainMetric][subMetric].field) || '_').replace(/[^\x00-\x7F]/g) })
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
