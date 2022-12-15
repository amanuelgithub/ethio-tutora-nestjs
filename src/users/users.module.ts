import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/casl/casl.module';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersRepository]), CaslModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
