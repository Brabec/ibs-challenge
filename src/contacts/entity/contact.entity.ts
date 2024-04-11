import { AddressEntity } from '@address/entity/address.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column({ length: 1 })
  sex: string;
  @Column()
  birth: Date;
  @Column()
  maritalStatus: string;
  @OneToOne(() => AddressEntity)
  address: AddressEntity;
}
