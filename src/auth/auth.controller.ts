import { ForbiddenError } from '@casl/ability';
import { Body, Controller, ForbiddenException, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Subject } from 'src/subjects/entities/subject.entity';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private caslAbilityFactory: CaslAbilityFactory) {}

  @Post('/signup')
  signup(@Body() signupDto: SignUpDto): Promise<void> {
    return this.authService.signup(signupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /** This is just a test endpoint to check if JwtAuthGuard
   *  is working.
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Create, Subject);
      return req.user;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
