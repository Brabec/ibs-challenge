import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from '@contacts/contacts.module';
import { AddressModule } from '@address/address.module';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ContactsModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
