import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '@auth/auth.service';
import { toPromise } from '@shared/utils';

@Injectable()
export class JwtEmailStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpired: false,
      secretOrKey: process.env.SECRETKEY,
    });
  }

  async validate(payload: any): Promise<any> {
    return toPromise({ id: payload.id, email: payload.email });
  }
}
