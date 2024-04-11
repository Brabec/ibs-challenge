import { Injectable } from '@nestjs/common';
import { addressConfig } from 'src/config/address.config';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class AddressService {

  async getAddressDetails(zipCode: string) {
    const { viacepAPI } = addressConfig;

    const response: AxiosResponse<any> = await axios.get(
      `${viacepAPI}${zipCode}/json/`,
    );

    if (response.status === 200) {
      console.log(response.data);
    }
  }
}
