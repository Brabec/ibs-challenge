import { LoginDto } from '@auth/dto/login.dto';

export interface UsersService {
  validateUser(loginDto: LoginDto): Promise<any>;
}
