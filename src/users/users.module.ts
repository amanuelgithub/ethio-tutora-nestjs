import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/casl/casl.module';
import { UsersRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';
import { LocationsService } from './services/locations.service';
import { LocationsController } from './controllers/locations.controller';
import { Location } from './entities/locations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Location, UsersRepository]),
    CaslModule,
  ],
  controllers: [UsersController, LocationsController],
  providers: [UsersService, UsersRepository, LocationsService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
