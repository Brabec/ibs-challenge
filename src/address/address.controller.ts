import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressService } from '@address/address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressDto } from './dto/address.dto';

@Controller('api/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':cep')
  async findOne(@Param('cep') zipCode: string) {
    return await this.addressService.getAddressDetails(zipCode);
  }

  @Post()
  async create(
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<AddressDto> {
    return await this.addressService.createAddress(createAddressDto);
  }
}
