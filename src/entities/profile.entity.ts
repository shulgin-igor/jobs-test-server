import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  description: string;

  @Column()
  position: string;

  @Column({ type: 'text' })
  about: string;

  @ManyToOne(() => User, (user) => user.profiles, { nullable: false })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
