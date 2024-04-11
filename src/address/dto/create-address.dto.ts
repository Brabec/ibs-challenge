export class CreateAddressDto {
  zipCode: string;
  street: string;
  number?: number;
  district: string;
  complement: string;
  uf: string;
}
