import { AddressEntity } from '@address/entity/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 1 })
  sex: string;

  @Column()
  maritalStatus: string;

  @Column()
  birth: Date;

  @OneToOne(() => AddressEntity, (address: AddressEntity) => address.contact)
  address: AddressEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
