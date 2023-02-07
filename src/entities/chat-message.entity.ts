import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatMember } from './chat-member.entity';
import { Chat } from './chat.entity';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ChatMember)
  author: ChatMember;

  @OneToOne(() => Chat)
  chat: Chat;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
