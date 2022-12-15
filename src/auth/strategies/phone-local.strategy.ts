import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class PhoneLocalStrategy extends PassportStrategy(Strategy, 'client') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'phone' });
  }

  async validate(phone: string, password: string): Promise<any> {
    const user = await this.authService.validateUserByPhone(phone, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
