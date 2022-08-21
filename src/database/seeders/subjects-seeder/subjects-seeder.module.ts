import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/subjects/entities/subject.entity';
import { SubjectsSeederService } from './subjects-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  providers: [SubjectsSeederService],
  exports: [SubjectsSeederService],
})
export class SubjectsSeederModule {}
