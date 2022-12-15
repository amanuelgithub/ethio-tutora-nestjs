import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { EmailSignUpDto } from './dto/email-signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { PhoneSignUpDto } from './dto/phone-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signupClient(phoneSignUpDto: PhoneSignUpDto): Promise<User> {
    const { phone, password } = phoneSignUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userExists = await this.usersService.findUserByPhone(phone);

    if (userExists) {
      throw new ConflictException(`Phone ${phone} taken`);
    }

    const data = {
      ...phoneSignUpDto,
      password: hashedPassword,
    } as PhoneSignUpDto;

    return this.usersService.signupWithPhone(data);
  }

  async signupTutor(emailSignUpDto: EmailSignUpDto): Promise<User> {
    const { email, password } = emailSignUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userExists = await this.usersService.findUserByEmail(email);

    if (userExists) {
      throw new ConflictException(`Email: ${email} is already taken!`);
    }

    const data = {
      ...emailSignUpDto,
      password: hashedPassword,
    } as EmailSignUpDto;

    return this.usersService.signupWithEmail(data);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      username: user.username,
      email: user.email,
      type: user.type,
    };
  }

  // used by the email-local.strategy.ts
  async validateUserByEmail(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // used by the phone-local.strategy.ts
  async validateUserByPhone(phone: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByPhone(phone);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
