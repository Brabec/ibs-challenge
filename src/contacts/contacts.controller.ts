import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactListDto } from './dto/contact-list.dto';
import { toPromise } from 'src/shared/utils';
import { ContactDto } from './dto/contact.dto';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('api/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async findAll(): Promise<ContactListDto> {
    const contactList = await this.contactsService.getContacts();

    return toPromise({ contactList });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ContactDto> {
    try {
      return await this.contactsService.getContact(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post()
  async create(
    @Body() createContactDto: CreateContactDto,
  ): Promise<ContactDto> {
    return await this.contactsService.createContact(createContactDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() contactDto: ContactDto,
  ): Promise<ContactDto> {
    return await this.contactsService.updateContact(+id, contactDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ContactDto> {
    return await this.contactsService.deleteContact(+id);
  }
}
