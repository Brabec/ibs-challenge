import { ContactEntity } from '@contacts/entity/contact.entity';

export class CreateAddressDto {
  zipCode: string;
  street: string;
  number?: string;
  district: string;
  complement: string;
  uf: string;
  contact?: ContactEntity;
}
