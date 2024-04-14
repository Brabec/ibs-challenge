import { AddressEntity } from '@address/entity/address.entity';
import { ContactEntity } from '@contacts/entity/contact.entity';
import { ManagerEntity } from '@managers/entity/manager.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DEV_ENV } from './constants/database.constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [ContactEntity, AddressEntity, ManagerEntity],
        synchronize: DEV_ENV,
        logging: DEV_ENV,
      }),
    }),
  ],
})
export class DatabaseModule {}
