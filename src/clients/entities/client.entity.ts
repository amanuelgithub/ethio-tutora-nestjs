import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((type) => User, (user) => user.client, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
