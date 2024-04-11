import { Module } from '@nestjs/common';
import { AddressController } from '@address/address.controller';
import { AddressService } from '@address/address.service';

@Module({
  imports: [],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
