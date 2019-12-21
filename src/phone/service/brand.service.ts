import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandEntity } from '../entity/brand.entity';
import { GsmarenaService } from 'src/scraper/service/gsmarena.service';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity) private brandsRepository: Repository<BrandEntity>,
    private gsmarenaService: GsmarenaService,
  ) {}

  async getBrands(): Promise<BrandEntity[]> {
    const brands = await this.brandsRepository.find(({ relations: ['phones'] }));
    return brands.map(brand => { return {...brand, data: JSON.parse(brand.data)}});
  }

  async getBrand(id: number): Promise<BrandEntity> {
    return await this.brandsRepository.findOne(id, ({ relations: ['phones'] }));
  }

  async getBrandByName(name: string): Promise<BrandEntity []> {
    return await this.brandsRepository.find({ where: [{ name }] });
  }

  async getBrandByUrl(url: string): Promise<BrandEntity []> {
    return await this.brandsRepository.find({ where: [{ url }] });
  }

  async populateBrands(): Promise<void> {
    const brands: any [] = await this.gsmarenaService.getBrands();
    for (const brand of brands) {
      await this.createBrand({
        name: brand.name,
        data: JSON.stringify(brand),
      }).catch(err => {
        // TODO console.log('err typeorm =>', err);
      });
    }
  }

  async createBrand(brand: BrandEntity) {
    if ((await this.getBrandByName(brand.name)).length) {
      await this.deleteBrand(brand);
    }
    await this.brandsRepository.save(brand);
  }

  async updateBrand(brand: BrandEntity) {
    await this.brandsRepository.save(brand);
  }

  async deleteBrand(brand: BrandEntity) {
    await this.brandsRepository.delete(brand);
  }
}
