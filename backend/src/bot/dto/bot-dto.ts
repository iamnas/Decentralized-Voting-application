export class CreateUserDto {
  readonly userAddress: string;
  readonly name: string;
  readonly gender: string;
  readonly discordID: string;
  readonly age: number;
}

export class CommandBotDto {
  readonly name: string;
  readonly description: string;
}

export class NotificationDto {
  readonly userName: string;
  readonly userAddress: string;
  readonly candidateName: string;
  readonly transaction: string;
}
