import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Repository } from 'typeorm';
import { subjects } from './data';

@Injectable()
export class SubjectsSeederService {
  constructor(@InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>) {}

  create(): Array<Promise<Subject>> {
    return subjects.map(async (subject: Subject) => {
      return await this.subjectRepository.save(subject);
    });
  }
}
