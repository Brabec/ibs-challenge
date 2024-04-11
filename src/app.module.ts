import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from '@contacts/contacts.module';
import { DatabaseModule } from './database/database.module';
import { AddressModule } from '@address/address.module';

@Module({
  imports: [ContactsModule, DatabaseModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
