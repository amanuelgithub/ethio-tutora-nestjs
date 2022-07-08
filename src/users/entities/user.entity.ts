import { Admin } from '../../admin/entities/admin.entity';
import { Client } from '../../clients/entities/client.entity';
import { Tutor } from '../../tutors/entities/tutor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from '../user-type.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true, unique: true })
  phone?: number;

  @Column({ nullable: true, unique: true })
  username?: string;

  @Column()
  password?: string;

  @Column()
  type?: UserType;

  @Column({ nullable: true })
  profileImage: string;

  // specify inverse side as a second parameter
  @OneToOne(() => Client, { onDelete: 'CASCADE' })
  client?: Client;

  // specify inverse side as a second parameter
  @OneToOne(() => Tutor, { onDelete: 'CASCADE' })
  tutor?: Tutor;

  @OneToOne(() => Admin, { onDelete: 'CASCADE' })
  admin?: Admin;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;
}
