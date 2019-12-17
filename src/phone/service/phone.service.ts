import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneEntity } from '../entity/phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity) private phonesRepository: Repository<PhoneEntity>,
  ) {}

  async getPhones(): Promise<PhoneEntity[]> {
    return await this.phonesRepository.find();
  }

  async getPhone(id: number): Promise<PhoneEntity> {
    return await this.phonesRepository.findOne(id);
  }

  async createPhone(phone: PhoneEntity) {
    this.phonesRepository.save(phone);
  }

  async updatePhone(phone: PhoneEntity) {
    this.phonesRepository.save(phone);
  }

  async deletePhone(phone: PhoneEntity) {
    this.phonesRepository.delete(phone);
  }
}
