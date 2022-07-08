import { User } from '../../users/entities/user.entity';
import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((_type) => User, { eager: true, onDelete: 'CASCADE' })
  user: User;
}
