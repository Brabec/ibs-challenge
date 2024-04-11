import { Injectable } from '@nestjs/common';
import { addressConfig } from 'src/config/address.config';
import axios, { AxiosResponse } from 'axios';
import { CreateAddressDto } from '@address/dto/create-address.dto';

@Injectable()
export class AddressService {
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
      };

      return addressDto;
    }
  }
}
