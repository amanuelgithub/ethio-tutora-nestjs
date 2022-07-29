import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser, User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { users } from './data';

@Injectable()
export class UsersSeederService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  /**
   * seed all user
   */
  create(): Array<Promise<User>> {
    return users.map(async (user: IUser) => {
      return await this.usersRepository.save(user);
    });
  }
}
