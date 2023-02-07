import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesController } from './profiles/profiles.controller';
import { ProfilesService } from './profiles/profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { ConversationsController } from './conversations/conversations.controller';
import { ConversationsService } from './conversations/conversations.service';
import { ChatMessage } from './entities/chat-message.entity';
import { User } from './entities/user.entity';
import { Chat } from './entities/chat.entity';
import { ChatMember } from './entities/chat-member.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // TODO: moved to the DatabaseModule
      type: 'mysql',
      host: 'localhost', // TODO: set in .env
      port: 3306, // TODO: set in .env
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, Chat, ChatMember, ChatMessage, Profile],
      synchronize: true,
      logging: true
    }),
    TypeOrmModule.forFeature([User, Chat, ChatMember, ChatMessage, Profile]),
  ],
  controllers: [AppController, ProfilesController, ConversationsController],
  providers: [AppService, ProfilesService, ConversationsService],
})
export class AppModule {}
