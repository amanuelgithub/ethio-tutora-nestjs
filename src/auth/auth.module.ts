import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { EmailLocalStrategy } from './strategies/email-local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CaslModule } from 'src/casl/casl.module';
import { PhoneLocalStrategy } from './strategies/phone-local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    CaslModule,
  ],
  providers: [AuthService, EmailLocalStrategy, PhoneLocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
