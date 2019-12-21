import { Get, Controller, Render, Param, Query } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as request from 'request-promise-native';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from './phone/entity/phone.entity';
import { Repository } from 'typeorm';
import { BrandService } from './phone/service/brand.service';
import { PhoneService } from './phone/service/phone.service';

const URI = 'https://www.gsmarena.com';

@Controller('phone')
export class PhoneController {
  
  constructor(private brandService: BrandService,
              private phoneService: PhoneService) { }
  
  @Get(':id')
  async findOne(@Param('id') id): Promise<any> {
    return await this.phone(id);
  }

  @Get()
  async getByBrand(@Query() query): Promise<any> {
    //console.log(query.brand);
    const brand = await this.brandService.getBrand(query.brand);
    return brand.phones;
    //console.log(await this.phoneService.getPhoneByBrand(brand));
    //console.log(await this.phoneService.getPhones());
    //return await this.phoneService.getPhoneByBrand(brand);
  }

  async phone(phone) {
    const options = {
      uri: URI + '/' + phone,
    };
    const html = await request.get(options);
    const $ = await cheerio.load(html);
    // Get phone detail
    let display_size = $('span[data-spec=displaysize-hl]').text();
    let display_res = $('div[data-spec=displayres-hl]').text();
    let camera_pixels = $('.accent-camera').text();
    let video_pixels = $('div[data-spec=videopixels-hl]').text();
    let ram_size = $('.accent-expansion').text();
    let chipset = $('div[data-spec=chipset-hl]').text();
    let battery_size = $('.accent-battery').text();
    let battery_type = $('div[data-spec=battype-hl]').text();

    let quick_spec = {
      display_size: display_size,
      display_res: display_res,
      camera_pixels: camera_pixels,
      video_pixels: video_pixels,
      ram_size: ram_size,
      chipset: chipset,
      battery_size: battery_size,
      battery_type: battery_type,
    };

    let title = $('.specs-phone-name-title').text();
    let img = $('.specs-photo-main a img').attr('src');
    let img_url = $('.specs-photo-main a').attr('href');

    let specNode = $('table');
    let spec_detail = [];
    specNode.each((i, el) => {
      let specList = [];
      let category = $(el)
        .find('th')
        .text();
      let specN = $(el).find('tr');
      specN.each((index, ele) => {
        let a = {
          name: $('td.ttl', ele).text(),
          value: $('td.nfo', ele).text(),
        };
        specList.push(a);
      });

      spec_detail.push({
        category: category,
        specs: specList,
      });
    });

    // get next and prev page link

    const data = {
      title: title,
      img: img,
      img_url: img_url,
      spec_detail: spec_detail,
      quick_spec: quick_spec,
    };

    return data;
  }

  async phonesOfBrand(brand: string) {
    const options = {
      uri: URI + '/' + brand,
    };
    const html = await request.get(options);
    const $ = await cheerio.load(html);
    const json = [];
    let phones = $('.makers').find('li');
    phones.each((i, el) => {
      let phone = {
        name: $(el)
          .find('span')
          .text(),
        img: $(el)
          .find('img')
          .attr('src'),
        url: $(el)
          .find('a')
          .attr('href'),
        description: $(el)
          .find('img')
          .attr('title'),
      };
      json.push(phone);
    });
    return json;
  }
}
