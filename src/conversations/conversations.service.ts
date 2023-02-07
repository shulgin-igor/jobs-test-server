import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMember } from 'src/entities/chat-member.entity';
import { ChatMessage } from 'src/entities/chat-message.entity';
import { Chat } from 'src/entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMesageRepository: Repository<ChatMessage>,
    @InjectRepository(ChatMember)
    private readonly chatMemberRepository: Repository<ChatMember>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  saveMessage(
    chatId: number,
    authorId: number,
    message: string,
  ): Promise<ChatMessage> {
    const model = this.chatMesageRepository.create({
      chat: { id: chatId },
      author: { id: authorId },
      message,
    });

    return this.chatMesageRepository.save(model);
  }

  // TODO: fix it
  async findChat(members: number[]): Promise<Chat> {
    const qb = this.chatMemberRepository.createQueryBuilder();
    const qb2 = this.chatMemberRepository.createQueryBuilder();

    const chatMember = await qb
      .where('userId = :user1', { user1: members[0] })
      .andWhere(
        `chatId IN (${qb2.select('chatId').where('userId = :user2').getSql()})`,
        { user2: members[1] },
      )
      .getOne();

    return chatMember.chat;
  }

  getMessages(chatId: number): Promise<ChatMessage[]> {
    return this.chatMesageRepository.find({ where: { chat: { id: chatId } } });
  }
}
