import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from '@auth/auth.module';
import { ManagersModule } from '@managers/managers.module';
import { ContactsModule } from '@contacts/contacts.module';
import { AddressModule } from '@address/address.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [
    DatabaseModule,
    ContactsModule,
    AddressModule,
    AuthModule,
    ManagersModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
