import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject) private subjectsRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const user = this.subjectsRepository.create(createSubjectDto);

    return await this.subjectsRepository.save(user);
  }

  async findAll(): Promise<Subject[]> {
    const subjects = await this.subjectsRepository.find();
    if (!subjects) {
      throw new NotFoundException('Not a single Subject is found!');
    }
    return subjects;
  }

  async findOne(id: string): Promise<Subject> {
    const subject = await this.subjectsRepository.findOne({ where: { id } });
    if (!subject) {
      throw new NotFoundException(`Subject: ${subject.name} is not found!`);
    }
    return subject;
  }

  async update(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    const subject = await this.findOne(id);

    const { name } = updateSubjectDto;

    subject.name = name;

    return await this.subjectsRepository.save(subject);
  }

  async remove(id: string): Promise<void> {
    const result = await this.subjectsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('Subject is not found!');
    }
  }
}
