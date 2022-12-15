import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { EmailSignUpDto } from './dto/email-signup.dto';
import { PhoneSignUpDto } from './dto/phone-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('client-signup')
  signupClient(@Body() phoneSignUpDto: PhoneSignUpDto): Promise<User> {
    return this.authService.signupClient(phoneSignUpDto);
  }

  @Post('tutor-signup')
  signupTutor(@Body() emailSignUpDto: EmailSignUpDto): Promise<User> {
    return this.authService.signupTutor(emailSignUpDto);
  }

  @UseGuards(AuthGuard('client'))
  @Post('signin-client')
  async signinClient(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('tutor'))
  @Post('signin-tutor')
  async signinTutor(@Request() req) {
    return this.authService.login(req.user);
  }
}
