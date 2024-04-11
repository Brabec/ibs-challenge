import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from '@address/address.service';

@Controller('api/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':cep')
  async findOne(@Param('cep') zipCode: string) {
    console.log('zip', zipCode);
    return await this.addressService.getAddressDetails(zipCode);
  }
}
