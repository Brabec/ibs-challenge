import { Injectable } from '@nestjs/common';
import { addressConfig } from 'src/config/address.config';
import axios, { AxiosResponse } from 'axios';
import { CreateAddressDto } from '@address/dto/create-address.dto';
import { AddressDto } from './dto/address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entity/address.entity';
import { Repository } from 'typeorm';
import { toAddressDto } from '@shared/mapper';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async getAddressDetails(zipCode: string): Promise<CreateAddressDto> {
    const { viacepAPI } = addressConfig;

    const response: AxiosResponse<any> = await axios.get(
      `${viacepAPI}${zipCode}/json/`,
    );

    if (response.status === 200) {
      const { logradouro, complemento, bairro, uf } = response.data;

      const addressDto: CreateAddressDto = {
        zipCode,
        street: logradouro,
        complement: complemento,
        district: bairro,
        uf,
        number: '',
      };

      return addressDto;
    }
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<AddressDto> {
    const newAddress = await this.addressRepository.save(createAddressDto);

    return toAddressDto(newAddress);
  }
}
