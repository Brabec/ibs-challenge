import { AddressEntity } from '@address/entity/address.entity';
import {
  IsEmail,
  IsOptional,
  MaxLength,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class ContactDto {
  id: number;
  name: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @MaxLength(1)
  @IsOptional()
  @IsEnum(['M', 'F'])
  sex: string;
  @IsOptional()
  @IsDateString()
  birth: Date;
  @IsOptional()
  @IsEnum(['divorced', 'married', 'single'])
  maritalStatus: string;
  createdAt: Date;
  address: AddressEntity;
}
