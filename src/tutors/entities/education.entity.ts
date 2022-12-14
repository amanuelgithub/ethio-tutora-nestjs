import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IEducation {
  school: string;
  from: Date;
  to: Date;
  degree: string;
  areaOfStudy: string;
  description: string;

  createAt: Date;
  updatedAt: Date;
}

@Entity()
export class Education implements IEducation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  school: string;

  @Column({ type: 'date' })
  from: Date;

  @Column({ type: 'date' })
  to: Date;

  @Column()
  degree: string;

  @Column()
  areaOfStudy: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
