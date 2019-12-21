import { Injectable} from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as request from 'request-promise-native';

const URI = 'https://www.gsmarena.com';

@Injectable()
export class GsmarenaService {

    async getBrands(): Promise<any[]> {
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

    async getPhonesOfBrand(brand: string): Promise<any[]> {
        const options = {
            uri: URI + '/' + brand,
        };
        try {
            const html = await request.get(options);
            const $ = await cheerio.load(html);
            const json = [];
            const phones = $('.makers').find('li');
            phones.each((i, el) => {
                const phone = {
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
        } catch (err) {
            console.log('phones of brand', err);
            return [];
        }
    }

    async getPhone(phone: string): Promise<any> {
        const options = {
            uri: URI + '/' + phone,
          };
        try {
        const html = await request.get(options);
        const $ = await cheerio.load(html);
          // Get phone detail
        const quickSpec = {
            display_size: $('span[data-spec=displaysize-hl]').text(),
            display_res: $('div[data-spec=displayres-hl]').text(),
            camera_pixels: $('.accent-camera').text(),
            video_pixels: $('div[data-spec=videopixels-hl]').text(),
            ram_size: $('.accent-expansion').text(),
            chipset: $('div[data-spec=chipset-hl]').text(),
            battery_size: $('.accent-battery').text(),
            battery_type: $('div[data-spec=battype-hl]').text(),
          };
        const title = $('.specs-phone-name-title').text();
        const img = $('.specs-photo-main a img').attr('src');
        const imgUrl = $('.specs-photo-main a').attr('href');
        const specNode = $('table');
        const specDetail = [];
        specNode.each((i, el) => {
            const specList = [];
            const category = $(el)
              .find('th')
              .text();
            const specN = $(el).find('tr');
            specN.each((index, ele) => {
              const a = {
                name: $('td.ttl', ele).text(),
                value: $('td.nfo', ele).text(),
              };
              specList.push(a);
            });
            specDetail.push({
              category,
              specs: specList,
            });
          });
        // get next and prev page link
        const data = {
            title,
            img,
            img_url: imgUrl,
            spec_detail: specDetail,
            quick_spec: quickSpec,
          };
        return data;
      } catch (err) {
        console.log('err', err);
        return null;
      }
    }

}
