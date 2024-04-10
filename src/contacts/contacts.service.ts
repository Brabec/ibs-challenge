import { Injectable } from '@nestjs/common';
import { contacts } from 'src/mocks/contacts.mock'; // todo: get from database
import { ContactEntity } from './entity/contact.entity';
import { ContactDto } from './dto/contact.dto';
import { toContactDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  contacts: ContactEntity[] = contacts;

  async getContact(id: number): Promise<ContactDto> {
    const contact = this.contacts.find((contact) => contact.id == id);

    return toPromise(toContactDto(contact));
  }

  async getContacts(): Promise<ContactDto[]> {
    const contacts = this.contacts.map((contact) => toContactDto(contact));

    return toPromise(contacts);
  }

  async createContact(createContactDto: CreateContactDto): Promise<ContactDto> {
    const { name, birth, maritalStatus, email, sex } = createContactDto;

    const id = this.contacts.length + 1;
    const newContact: ContactEntity = {
      id,
      name,
      birth,
      maritalStatus,
      email,
      sex,
    };

    this.contacts.push(newContact);

    return toPromise(toContactDto(newContact));
  }

  async updateContact(id: number, contactDto: ContactDto): Promise<ContactDto> {
    this.contacts.map((contact) => {
      if (contact.id === id) {
        return { ...contact, ...contactDto };
      }
      return contact;
    });

    return toPromise(contactDto);
  }

  async deleteContact(id: number): Promise<ContactDto> {
    const toBeRemoved = this.getContact(id);
    this.contacts = this.contacts.filter((contact) => contact.id !== id);

    return toPromise(toBeRemoved);
  }
}
