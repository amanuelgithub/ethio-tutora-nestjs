import { Injectable } from '@nestjs/common';
import { IUser, User } from './entities/user.entity';
import { UserType } from './user-type.enum';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async signup(
    userType: UserType,
    password: string,
    email: string,
  ): Promise<User> {
    const user = this.usersRepository.create({
      email,
      password,
      userType,
    } as IUser);

    return this.usersRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }
}
