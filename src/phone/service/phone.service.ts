import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneEntity } from '../entity/phone.entity';
import { BrandService } from './brand.service';
import { BrandEntity } from '../entity/brand.entity';
import { GsmarenaService } from '../../scraper/service/gsmarena.service';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity) private phonesRepository: Repository<PhoneEntity>,
    private gsmarenaService: GsmarenaService,
    private brandService: BrandService,
  ) { }

  async getPhones(): Promise<PhoneEntity[]> {
    return await this.phonesRepository.find();
  }

  async getPhone(id: number): Promise<PhoneEntity> {
    const phone = await this.phonesRepository.findOne(id);
    return {
      ...phone,
      data: JSON.parse(phone.data)
    }
  }

  async getPhoneByBrand(brand: BrandEntity): Promise<PhoneEntity []> {
    return await this.phonesRepository.find({where: {brand}});
  }
  

  async populatePhones(): Promise<void> {
    for (const brand of (await this.brandService.getBrands())) {
      console.log('phone brand', brand);
      for ( let phone of (await this.gsmarenaService.getPhonesOfBrand(JSON.parse(brand.data).url))) {
        phone = await this.gsmarenaService.getPhone(phone.url);
        if(phone) {
          console.log('phone brand -', phone);
          await this.createPhone({
            name: phone.title,
            data: JSON.stringify(phone),
            brand
          });
        }
      }
    }
  }

  async createPhone(phone: PhoneEntity) {
    await this.phonesRepository.save(phone);
  }

  async updatePhone(phone: PhoneEntity) {
    await this.phonesRepository.save(phone);
  }

  async getPhoneByName(name: string): Promise<BrandEntity> {
    const phone = await this.phonesRepository.findOne({name});
    return {
      ...phone,
      data: JSON.parse(phone.data)
    };
  }

  async deletePhone(phone: PhoneEntity) {
    if (await this.getPhoneByName(phone.name)) {
      await this.deletePhone(phone);
    }
    await this.phonesRepository.delete(phone);
  }
}
