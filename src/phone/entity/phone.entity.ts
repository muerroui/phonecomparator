import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BrandEntity } from './brand.entity';

@Entity()
export class PhoneEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    name: string;

    @Column({type: 'longtext'})
    data: any;

    @ManyToOne(type => BrandEntity, (brand) => brand.phones)
    public brand: BrandEntity;
}
