import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  getAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  getById(profileId: number): Promise<Profile> {
    return this.profileRepository.findOne({ where: { id: profileId } });
  }
}
