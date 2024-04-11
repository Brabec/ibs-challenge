import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AddressEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() zipCode: string;
  @Column() street: string;
  @Column() number: number;
  @Column() district: string;
  @Column() complement: string;
  @Column({ length: 2 }) uf: string;
}
