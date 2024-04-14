import { AddressDto } from '@address/dto/address.dto';
import { AddressEntity } from '@address/entity/address.entity';
import { ContactDto } from '@contacts/dto/contact.dto';
import { ContactEntity } from '@contacts/entity/contact.entity';
import { ManagerDto } from '@managers/dto/manager.dto';
import { ManagerEntity } from '@managers/entity/manager.entity';

export const toContactDto = (data: ContactEntity): ContactDto => {
  const { id, name, email, sex, maritalStatus, createdAt } = data;
  const birth = new Date(data.birth);
  const { address } = data;
  const contactDto: ContactDto = {
    id,
    name,
    email,
    sex,
    birth,
    maritalStatus,
    createdAt,
    daysToBirthday: daysToBirthday(birth),
    address,
  };

  return contactDto;
};

export const daysToBirthday = (birth): number => {
  const today = new Date(Date.now());

  const nextBirthday = new Date(
    today.getFullYear(),
    birth.getMonth(),
    birth.getDate(),
  );

  if (nextBirthday.getTime() < today.getTime()) {
    // birthday already passed
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const sub = nextBirthday.getTime() - today.getTime();

  const millisecInADay = 1000 * 60 * 60 * 24; // 86_400_000
  return Math.ceil(sub / millisecInADay);
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
