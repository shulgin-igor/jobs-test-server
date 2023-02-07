import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  list() {
    return this.profilesService.getAll();
  }

  @Get(':profileId')
  show(@Param('profileId', ParseIntPipe) profileId: number) {
    return this.profilesService.getById(profileId);
  }
}
