import { LoginDto } from '@auth/dto/login.dto';
import { ManagersService } from '@managers/managers.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: ManagersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    return await this.usersService.validateUser(loginDto);
  }

  async signIn(loginDto: LoginDto) {
    return {
      access_token: this.jwtService.sign(loginDto),
    };
  }
}
