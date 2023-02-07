import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SendMessageDTO } from 'src/dto/send-message.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ConversationsService } from './conversations.service';

const AUTHENTICATED_USER_ID = 3;

@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Get(':profileId')
  async messages(@Param('profile', ParseIntPipe) profileId: number) {
    const profile = await this.profilesService.getById(profileId);

    if (!profile) {
      throw new NotFoundException();
    }

    let chat = await this.conversationsService.findChat([
      profile.user.id,
      AUTHENTICATED_USER_ID,
    ]);
    return this.conversationsService.getMessages(chat.id);
  }

  @Post(':profileId')
  // TODO: perform auth
  async saveMessage(
    @Param('profileId', ParseIntPipe) profileId: number,
    @Body() body: SendMessageDTO,
  ) {
    const profile = await this.profilesService.getById(profileId);

    if (!profile) {
      throw new NotFoundException();
    }

    let chat = await this.conversationsService.findChat([
      profile.user.id,
      AUTHENTICATED_USER_ID,
    ]);

    if (!chat) {
      // TODO: create chat
    }

    return this.conversationsService.saveMessage(
      chat.id,
      AUTHENTICATED_USER_ID,
      body.message,
    );
  }
}
