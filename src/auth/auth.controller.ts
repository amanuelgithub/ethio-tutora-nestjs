import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private caslAbilityFactory: CaslAbilityFactory) {}

  @Post('signup')
  signup(@Body() signupDto: SignUpDto): Promise<void> {
    return this.authService.signup(signupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
