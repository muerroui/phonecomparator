import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone } from '../entity/phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone) private phonesRepository: Repository<Phone>,
  ) {}

  async getPhones(): Promise<Phone[]> {
    return await this.phonesRepository.find();
  }

  async getPhone(id: number): Promise<Phone> {
    return await this.phonesRepository.findOne(id);
  }

  async createPhone(phone: Phone) {
    this.phonesRepository.save(phone);
  }

  async updatePhone(phone: Phone) {
    this.phonesRepository.save(phone);
  }

  async deletePhone(phone: Phone) {
    this.phonesRepository.delete(phone);
  }
}
