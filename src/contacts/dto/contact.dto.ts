export class ContactDto {
  id: number;
  name: string;
  // @IsEmail()
  email: string;
  // @MaxLength(1)
  sex: string; // @IsEnum(['M', 'F'])
  birth: Date;
  // @IsEnum(['divorced', 'married', 'single'])
  maritalStatus: string;
  // address: AddressEntity;
}
