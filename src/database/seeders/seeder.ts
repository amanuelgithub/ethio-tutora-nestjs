import { Injectable, Logger } from '@nestjs/common';
import { UsersSeederService } from './users-seeder/users-seeder.service';

@Injectable()
export class Seeder {
  constructor(private readonly logger: Logger, private readonly usersSeederService: UsersSeederService) {}

  async seed() {
    await this.users()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding the users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.debug('Failed seeding users...');
        Promise.reject(error);
      });
  }

  async users() {
    return await Promise.all(this.usersSeederService.create())
      .then((createdUser) => {
        this.logger.debug(
          'No. of users created: ' + createdUser.filter((nullValueCreatedUser) => nullValueCreatedUser).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
