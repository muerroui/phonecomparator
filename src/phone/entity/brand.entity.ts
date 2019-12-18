import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PhoneEntity } from './phone.entity';

@Entity()
export class BrandEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    name: string;

    @Column({type: 'longtext'})
    data: any;

    @OneToMany(type => PhoneEntity, (phone) => phone.brand)
    phones?: PhoneEntity[];

}
