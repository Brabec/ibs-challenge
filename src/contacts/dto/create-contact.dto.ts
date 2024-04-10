export class CreateContactDto {
  name: string;
  // @MaxLength(1)
  email: string;
  sex: string; // @IsEnum(['M', 'F'])
  birth: Date;
  // @IsEnum(['divorced', 'married', 'single'])
  maritalStatus: string;
  // address: AddressEntity;
}
