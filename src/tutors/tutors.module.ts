import { Module } from '@nestjs/common';
import { TutorsService } from './services/tutors.service';
import { TutorsController } from './controllers/tutors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeeklyAvailability } from './entities/weekly-availbility.entity';
import { weeklyAvailabilityController } from './controllers/weekly-availablity.controller';
import { weeklyAvailabilityService } from './services/weekly-availability.service';
import { UsersModule } from '../users/users.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeeklyAvailability]),
    UsersModule,
    CaslModule,
  ],
  providers: [TutorsService, weeklyAvailabilityService],
  controllers: [TutorsController, weeklyAvailabilityController],
  exports: [TutorsService],
})
export class TutorsModule {}
