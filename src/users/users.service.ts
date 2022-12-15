import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailSignUpDto } from 'src/auth/dto/email-signup.dto';
import { PhoneSignUpDto } from 'src/auth/dto/phone-signup.dto';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // all tutors, clients, and admins
  async findAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();

    if (!users) {
      throw new NotFoundException('no users found');
    }

    return users;
  }

  async signupWithEmail(emailSignUpDto: EmailSignUpDto): Promise<User> {
    const user = this.usersRepository.create(emailSignUpDto);

    return this.usersRepository.save(user);
  }

  async signupWithPhone(phoneSignUpDto: PhoneSignUpDto): Promise<User> {
    const user = this.usersRepository.create(phoneSignUpDto);

    return this.usersRepository.save(user);
  }

  async findUserByPhone(phone: string): Promise<User> {
    const user = this.usersRepository
      .createQueryBuilder('user')
      .where('user.phone = :phone', { phone })
      .getOne();

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  // change password
  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    const { password } = changePasswordDto;

    const user = await this.findUserById(id);

    user.password = password;

    await this.usersRepository.save(user);

    return { password } as User;
  }
}
