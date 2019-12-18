
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

  async phoneBrands() {
    const options = {
        uri: URI + '/makers.php3'
    };
    const html = await request.get(options);
    const $ = await cheerio.load(html);
    const json = [];
    const brands = $('table').find('td');
    brands.each((i, el) => {
      let brand;
      brand = {
          name: $(el).find('a').text().replace(' devices', '').replace(/[0-9]/g, ''),
          devices: $(el).find('span').text().replace(' devices', ''),
          url: $(el).find('a').attr('href'),
      };
      json.push(brand);
    });
    return json;
  }
}
