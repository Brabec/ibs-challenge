import { AddressDto } from '@address/dto/address.dto';
import { AddressEntity } from '@address/entity/address.entity';
import { ContactDto } from '@contacts/dto/contact.dto';
import { ContactEntity } from '@contacts/entity/contact.entity';
import { ManagerDto } from '@managers/dto/manager.dto';
import { ManagerEntity } from '@managers/entity/manager.entity';

export const toContactDto = (data: ContactEntity): ContactDto => {
  const { id, name, email, sex, birth, maritalStatus, createdAt } = data;
  const { address } = data;
  const contactDto: ContactDto = {
    id,
    name,
    email,
    sex,
    birth,
    maritalStatus,
    createdAt,
    address,
  };

  return contactDto;
};

export const toAddressDto = (data: AddressEntity): AddressDto => {
  const { id, number, complement, zipCode, street, district, uf } = data;
  const addressDto: AddressDto = {
    id,
    number,
    complement,
    zipCode,
    street,
    district,
    uf,
  };

  return addressDto;
};

export const toManagerDto = (data: ManagerEntity): ManagerDto => {
  const managerDto: ManagerDto = { id: data.id, email: data.email };

  return managerDto;
};
