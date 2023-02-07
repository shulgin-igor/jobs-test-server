import { IsNotEmpty } from 'class-validator';

export class SendMessageDTO {
  @IsNotEmpty()
  message: string;
}
