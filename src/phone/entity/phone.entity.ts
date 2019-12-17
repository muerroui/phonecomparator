import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Phone {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    data: string;
}
