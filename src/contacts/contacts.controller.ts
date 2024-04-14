import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from '@contacts/contacts.service';
import { ContactDto } from '@contacts/dto/contact.dto';
import { CreateContactDto } from '@contacts/dto/create-contact.dto';
import { AddressService } from '@address/address.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CreateAddressDto } from '@address/dto/create-address.dto';
import { ContactEntity } from './entity/contact.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationService } from '@pagination/pagination.service';

@UseGuards(JwtAuthGuard)
@Controller('api/contacts')
export class ContactsController {
  constructor(
    private readonly paginationService: PaginationService,
    private readonly contactsService: ContactsService,
    private readonly addressService: AddressService,
  ) {}

  @Get()
  async findAll(@Query() query): Promise<Pagination<ContactEntity>> {
    const { page, limit, search } = query;
    const paginationOptions = {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    };

    let searchOptions;
    if (search) {
      searchOptions = { name: search };
    }

    const contactRepository = await this.contactsService.getContacts();

    return this.paginationService.paginate<ContactEntity>(
      contactRepository,
      paginationOptions,
      searchOptions,
    );
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
    let addressDto: CreateAddressDto;
    try {
      addressDto = await this.addressService.getAddressDetails(
        createContactDto.address.zipCode,
      ); // todo: this should not happen here.
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

    // replace given address with api response data
    createContactDto.address = {
      ...createContactDto.address,
      ...addressDto,
    };

    try {
      // and inject into createContactDto to createContact
      return await this.contactsService.createContact(createContactDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() contactDto: ContactDto,
  ): Promise<ContactDto> {
    try {
      return await this.contactsService.updateContact(+id, contactDto);
    } catch (err) {
      let status = HttpStatus.BAD_REQUEST;
      if (err instanceof NotFoundException) {
        status = err.getStatus();
      }
      throw new HttpException(err.message, status);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ContactDto> {
    try {
      return await this.contactsService.deleteContact(+id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
