import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from '@contacts/contacts.service';
import { ContactListDto } from '@contacts/dto/contact-list.dto';
import { toPromise } from '@shared/utils';
import { ContactDto } from '@contacts/dto/contact.dto';
import { CreateContactDto } from '@contacts/dto/create-contact.dto';
import { AddressService } from '@address/address.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@Controller('api/contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly addressService: AddressService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<ContactListDto> {
    const contactList = await this.contactsService.getContacts();

    return toPromise({ contactList });
  }

  @UseGuards(JwtAuthGuard)
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
    const addressDto = await this.addressService.getAddressDetails(
      createContactDto.address.zipCode,
    ); // todo: this should not happen here.

    // replace given address with api response data
    createContactDto.address = {
      ...createContactDto.address,
      ...addressDto,
    };

    // and inject into createContactDto to createContact
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
