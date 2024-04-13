import { AuthService } from '@auth/auth.service';
import { LoginDto } from '@auth/dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const loginDto: LoginDto = {
      email,
      password,
    };
    const user = await this.authService.validateUser(loginDto);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
