import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { TutorsService } from 'src/tutors/services/tutors.service';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/users/user-type.enum';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { Client } from 'src/clients/entities/client.entity';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tutorsService: TutorsService,
    private clientsService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto): Promise<void> {
    const { email, password, type } = signUpDto;

    // salting and hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    if (email) {
      this.signupWithEmail(email, hashedPassword, type);
    } else {
      // both email and phone is empty
      throw new BadRequestException(' Email Field cannot be empty!');
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

        this.tutorsService.signup(tutor);
      } else if (user.type === UserType.CLIENT) {
        const client = new Client();
        client.user = user;

        this.clientsService.signUpClient(client);
      } else if (user.type === UserType.ADMIN) {
        // todo:
      }
    } else {
      // else throw conflict exception (although not working as intended.)
      throw new ConflictException(`Email: ${email} is already taken!`);
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  // used by the local.strategy.ts
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
