import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PhoneEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    data: string;
}
