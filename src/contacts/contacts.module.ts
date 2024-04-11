import { Module } from '@nestjs/common';
import { ContactsController } from '@contacts/contacts.controller';
import { ContactsService } from '@contacts/contacts.service';
import { AddressService } from '@address/address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './entity/contact.entity';
import { AddressEntity } from '@address/entity/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity, AddressEntity])],
  controllers: [ContactsController],
  providers: [ContactsService, AddressService],
})
export class ContactsModule {}
