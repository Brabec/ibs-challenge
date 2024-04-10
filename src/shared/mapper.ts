import { ContactDto } from 'src/contacts/dto/contact.dto';
import { ContactEntity } from 'src/contacts/entity/contact.entity';

export const toContactDto = (data: ContactEntity): ContactDto => {
  const { id, name, email, sex, birth, maritalStatus } = data;
  const contactDto: ContactDto = { id, name, email, sex, birth, maritalStatus };

  return contactDto;
};
