import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class TutorsService {
  constructor(private usersRepository: UsersRepository) {}
}
