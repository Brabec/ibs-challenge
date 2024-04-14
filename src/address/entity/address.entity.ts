import { ContactEntity } from '@contacts/entity/contact.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zipCode: string;

  @Column()
  street: string;

  @Column({ nullable: false })
  number: string;

  @Column()
  district: string;

  @Column()
  complement: string;

  @Column({ length: 2 })
  uf: string;
  @OneToOne(() => ContactEntity, (contact) => contact.address, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id' })
  contact: ContactEntity;
}
