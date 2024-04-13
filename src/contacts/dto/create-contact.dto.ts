import { CreateAddressDto } from '@address/dto/create-address.dto';
import { IsEnum, IsDateString } from 'class-validator';

const maritalEnum = ['divorced', 'married', 'single'];
export class CreateContactDto {
  name: string;
  email: string;
  @IsEnum(['M', 'F'])
  sex: string;
  @IsDateString()
  birth: Date;
  @IsEnum(maritalEnum, {
    message: `maritalStatus must be one of the following: ${maritalEnum}`,
  })
  maritalStatus: string;
  address: CreateAddressDto;
}
