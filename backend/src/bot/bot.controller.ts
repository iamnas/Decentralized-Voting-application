import { Body, Controller, Get, Post } from '@nestjs/common';
import { BotService } from './bot.service';
import { CommandBotDto, NotificationDto } from './dto/bot-dto';

@Controller('api/v1/bot')
export class BotController {
  constructor(private botService: BotService) {}

  @Post()
  async sendNotification(
    @Body()
    notification: NotificationDto,
  ) {
    return await this.botService.sendNotification(notification);
  }

  @Post('sendWinnerNotification')
  async sendWinnerNotification() {
    return await this.botService.sendWinnerNotification();
  }

  @Post('sendCandidateRegisteredNotification')
  async sendCandidateRegisteredNotification(
    @Body()
    notification: NotificationDto,
  ) {
    return await this.botService.sendCandidateRegisteredNotification(
      notification,
    );
  }

  @Post('createcommand')
  async createCommand(
    @Body()
    command: CommandBotDto,
  ) {
    return this.botService.createCommand(command);
  }

  @Get()
  async getWinner() {
    return this.botService.getWinner();
  }

  @Get('/getVoteTallie')
  async getVoteTallie() {
    return this.botService.getVoteTallie();
  }
}
