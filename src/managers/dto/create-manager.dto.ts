import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateManagerDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
