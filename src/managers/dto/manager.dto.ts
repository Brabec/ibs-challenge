import { IsNotEmpty, IsEmail } from 'class-validator';

export class ManagerDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
