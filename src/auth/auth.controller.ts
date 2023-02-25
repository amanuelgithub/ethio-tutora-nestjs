import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { EmailSignUpDto } from './dto/email-signup.dto';
import { PhoneSignUpDto } from './dto/phone-signup.dto';
import { ClientAuthGuard } from './guards/client-auth.guard';
import { TutorAuthGuard } from './guards/tutor-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('phone-signup')
  signupClient(@Body() phoneSignUpDto: PhoneSignUpDto): Promise<User> {
    return this.authService.signupClient(phoneSignUpDto);
  }

  @Post('email-signup')
  signupTutor(@Body() emailSignUpDto: EmailSignUpDto): Promise<User> {
    return this.authService.signupTutor(emailSignUpDto);
  }

  @UseGuards(ClientAuthGuard)
  @Post('signin-phone')
  async signinClient(@Request() req) {
    // console.log('requesting client', req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(TutorAuthGuard)
  @Post('signin-email')
  async signinTutor(@Request() req) {
    // console.log('requesting tutor', req.user);
    return this.authService.login(req.user);
  }
}
