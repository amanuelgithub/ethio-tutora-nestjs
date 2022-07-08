import { Admin } from 'src/admin/entities/admin.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
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

  // specify inverse side as a second parameter
  @OneToOne(() => Client, (client) => client.user, { onDelete: 'CASCADE' })
  client?: Client;

  // specify inverse side as a second parameter
  @OneToOne(() => Tutor, (tutor) => tutor.user, { onDelete: 'CASCADE' })
  tutor?: Tutor;

  @OneToOne(() => Admin, (admin) => admin.user, { onDelete: 'CASCADE' })
  admin?: Admin;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;
}
