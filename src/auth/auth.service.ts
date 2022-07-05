import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { TutorsService } from 'src/tutors/services/tutors.service';
import { JwtService } from '@nestjs/jwt';
import { JwtEmailPayload } from './jwt-email-payload.interface';
import { UserType } from 'src/users/user-type.enum';
import { Tutor } from 'src/tutors/entities/tutor.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tutorsService: TutorsService,
    private jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto): Promise<void> {
    const { email, phone, password, type } = signUpDto;

    // salting and hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    if (email) {
      this.signupWithEmail(email, hashedPassword, type);
    } else if (phone) {
      this.signupWithPhone(phone, hashedPassword, type);
    } else {
      // both email and phone is empty
      throw new BadRequestException(
        'Both Email and Phone Fields cannot be empty!',
      );
    }
  }

  async signin(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, phone, password } = signInDto;

    let user: User;

    if (email) {
      user = await this.usersService.findUserByEmail(email);
    } else if (phone) {
      user = await this.usersService.findUserByPhone(phone);
    } else {
      throw new BadRequestException('Either Email or Phone must be provided!');
    }

    // dehash the password
    if (user && (await bcrypt.compare(password, user.password))) {
      // todo: implement JWT(json web token)
      const payload: JwtEmailPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please Check you login credentials!');
    }
  }

  private async signupWithPhone(
    phone: number,
    hashedPassword: string,
    type: any,
  ): Promise<void> {
    const oldUser = await this.usersService.findUserByPhone(phone);

    if (!oldUser) {
      const user = await this.usersService.signup(
        type,
        hashedPassword,
        null,
        phone,
      );
      // register to other tables based on the UserType enum
      if (user.type === UserType.TUTOR) {
        const tutor = new Tutor();
        tutor.user = user;

        this.tutorsService.signUpTutor(tutor);
      } else if (user.type === UserType.CLIENT) {
        // todo:
      } else if (user.type === UserType.ADMIN) {
        // todo:
      }
    } else {
      throw new ConflictException(`Phone: ${phone} is already taken!`);
    }
  }

  private async signupWithEmail(
    email: string,
    hashedPassword: string,
    type: any,
  ): Promise<void> {
    const oldUser = await this.usersService.findUserByEmail(email);

    if (!oldUser) {
      // create new user
      const user = await this.usersService.signup(
        type,
        hashedPassword,
        email,
        null,
      );
      // register to other tables based on the UserType enum
      console.log('User Type ===> ', user.type);
      if (user.type == UserType.TUTOR) {
        const tutor = new Tutor();
        tutor.user = user;

        this.tutorsService.signUpTutor(tutor);
      } else if (user.type === UserType.CLIENT) {
        // todo:
      } else if (user.type === UserType.ADMIN) {
        // todo:
      }
    } else {
      // else throw conflict exception (although not working as intended.)
      throw new ConflictException(`Email: ${email} is already taken!`);
    }
  }
}
