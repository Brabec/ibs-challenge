import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactEntity } from '@contacts/entity/contact.entity';
import { ContactDto } from '@contacts/dto/contact.dto';
import { toContactDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import { CreateContactDto } from '@contacts/dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AddressEntity } from '@address/entity/address.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  async getContact(id: number): Promise<ContactDto> {
    const contact = await this.contactRepository.findOneOrFail({
      where: { id },
      relations: ['address'],
    });

    return toPromise(toContactDto(contact));
  }

  async getContacts(): Promise<ContactDto[]> {
    const contacts = (
      await this.contactRepository.find({ relations: ['address'] })
    ).map((contact) => toContactDto(contact));

    return toPromise(contacts);
  }

  async createContact(createContactDto: CreateContactDto): Promise<ContactDto> {
    const { name, birth, maritalStatus, email, sex } = createContactDto;
    const { address } = createContactDto;

    const newContact = await this.contactRepository.save({
      name,
      birth,
      maritalStatus,
      email,
      sex,
    });

    await this.addressRepository.save({
      contact: newContact,
      ...address,
    });

    return toPromise(toContactDto(newContact));
  }

  async updateContact(id: number, contactDto: ContactDto): Promise<ContactDto> {
    const updateResult: UpdateResult = await this.contactRepository.update(id, {
      ...contactDto,
      updatedAt: new Date(Date.now()),
    });

    if (updateResult.affected === 0) {
      throw new NotFoundException();
    }

    return toPromise(contactDto);
  }

  async deleteContact(id: number): Promise<ContactDto> {
    let toBeRemoved: ContactDto | null;

    try {
      toBeRemoved = await this.getContact(id);
    } catch (err) {
      throw new NotFoundException();
    }

    await this.contactRepository.delete(id);

    return toPromise(toBeRemoved);
  }
}
