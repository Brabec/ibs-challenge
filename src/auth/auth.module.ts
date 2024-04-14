import { Module } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { ManagersModule } from '@managers/managers.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRESIN, SECRETKEY } from './constants/jwt.constants';
import { JwtEmailStrategy } from './strategies/jwt-email.strategy';

@Module({
  imports: [
    ManagersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: SECRETKEY,
      signOptions: {
        expiresIn: EXPIRESIN,
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtEmailStrategy],
  exports: [AuthService],
})
export class AuthModule {}
