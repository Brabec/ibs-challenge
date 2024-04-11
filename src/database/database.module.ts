import { AddressEntity } from '@address/entity/address.entity';
import { ContactEntity } from '@contacts/entity/contact.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        entities: [ContactEntity, AddressEntity],
        synchronize: process.env.APP_ENV === 'development',
        logging: process.env.APP_ENV === 'development',
      }),
    }),
  ],
})
export class DatabaseModule {}
