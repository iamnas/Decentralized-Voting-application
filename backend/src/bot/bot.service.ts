import { Injectable, Logger } from '@nestjs/common';

import { On, Once, InjectDiscordClient } from '@discord-nestjs/core';
import {
  Client,
  Interaction,
  Message,
  WebhookClient,
  REST,
  Routes,
} from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { CommandBotDto, NotificationDto } from './dto/bot-dto';

import { ethers } from 'ethers';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private config: ConfigService,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('messageCreate')
  async onMessage(message: Message): Promise<void> {
    if (message.content.startsWith('winner')) {
      const winner = await this.getWinner();

      const winnerMessage = `
      🏆 **Winner Announced!**

      The winner of the recent vote is:
      
      **Candidate:** ${winner[1]}
      **Total Votes:** ${winner[2]}
      
      Congratulations to ${winner[1]} for securing the majority of votes! 🎉👏
      
      #winner #electionresults #communityengagement`;

      await message.reply(winnerMessage);
    }

    if (!message.author.bot && message.content.toLowerCase() === 'hello') {
      await message.reply(`Hello ${message.author.globalName}`);
    }

    if (
      message.content.toLowerCase() === 'votingresults' ||
      message.content.startsWith('winner') ||
      message.content.startsWith('result') ||
      message.content.toLowerCase() === 'result'
    ) {
      const getVoteTallie = await this.getVoteTallie();

      const resultMessage =
        await this.createVotingResultsMessage(getVoteTallie);
      await message.reply(resultMessage);
    }
  }

  @On('interactionCreate')
  async onInteraction(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }

    if (interaction.commandName === 'winner') {
      const winner = await this.getWinner();

      const message = `
      🏆 **Winner Announced!**

      The winner of the recent vote is:
      
      **Candidate:** ${winner[1]}
      **Total Votes:** ${winner[2]}
      
      Congratulations to ${winner[1]} for securing the majority of votes! 🎉👏
      
      #winner #electionresults #communityengagement`;

      await interaction.reply(message);
    }
  }

  async sendNotification(notification: NotificationDto) {
    const message = `🗳️ **New Vote Received!**

    **Voter:** ${notification.userName || notification.userAddress}
    **Candidate:**  ${notification.candidateName}
    
    Thank you for participating in the decentralized voting process! 🙌 Let your voice be heard!
      
    #voting #decentralizedvoting #communityengagement`;

    this.sendMessage(message);
  }

  async sendWinnerNotification() {
    const winner = await this.getWinner();

    const message = `🏆 **Election Result**

    The winner of the recent vote is:
    
    **Winner:** ${winner[1]}
    **Total Votes:** ${winner[2]}
    
    Congratulations to ${winner[1]} for securing the majority of votes! 🎉👏
    
    #winner #electionresults #communityengagement`;

    this.sendMessage(message);
  }

  async sendCandidateRegisteredNotification(notification: NotificationDto) {
    const message = `📢 **New Candidate Registered**

    A new candidate has been registered for the upcoming vote:
    
    **Candidate Name:** ${notification.candidateName}
    
    Welcome, ${notification.candidateName}!  🎉 Let's wish them the best in the upcoming election.
    
    #newcandidate #electionregistration #communityengagement`;

    this.sendMessage(message);
  }

  async sendMessage(message: string) {
    const WEBHOOK_URL = this.config.get('WEBHOOK_URL');
    const webhookClient = new WebhookClient({ url: WEBHOOK_URL });

    try {
      await webhookClient.send(message);
    } catch (error) {
      console.log(error);
    } finally {
      webhookClient.destroy();
    }
  }

  async createCommand(commandDto: CommandBotDto) {
    try {
      const CLIENT_ID = this.config.get('CLIENT_ID');
      const BOT_TOKEN = this.config.get('BOT_TOKEN');

      const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);
      console.log('Started refreshing application (/) commands.');

      const commands = [
        {
          name: commandDto.name,
          description: commandDto.description,
        },
      ];

      await rest.put(Routes.applicationCommands(CLIENT_ID), {
        body: commands,
      });

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.log(error);
    }
  }

  async getWinner() {
    const ABI = [
      {
        inputs: [],
        name: 'winner',
        outputs: [
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint8',
            name: 'voteCount',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ];
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        this.config.get('RPC'),
      );

      const contract = new ethers.Contract(
        this.config.get('CONTRACT_ADDRESS'),
        ABI,
        provider,
      );

      return await contract.winner();
    } catch (error) {
      console.log(error);
    }
  }

  async getVoteTallie() {
    const ABI = [
      {
        inputs: [],
        name: 'getVoteTallies',
        outputs: [
          {
            components: [
              {
                internalType: 'bool',
                name: 'isActive',
                type: 'bool',
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'uint8',
                name: 'voteCount',
                type: 'uint8',
              },
            ],
            internalType: 'struct VotingSystem.Candidate[]',
            name: 'voteTallies',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ];
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        this.config.get('RPC'),
      );

      const contract = new ethers.Contract(
        this.config.get('CONTRACT_ADDRESS'),
        ABI,
        provider,
      );
      return await contract.getVoteTallies();
    } catch (error) {
      console.log(error);
    }
  }

  async getContract() {
    const ABI = [
      {
        inputs: [],
        name: 'winner',
        outputs: [
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint8',
            name: 'voteCount',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getVoteTallies',
        outputs: [
          {
            components: [
              {
                internalType: 'bool',
                name: 'isActive',
                type: 'bool',
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'uint8',
                name: 'voteCount',
                type: 'uint8',
              },
            ],
            internalType: 'struct VotingSystem.Candidate[]',
            name: 'voteTallies',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ];
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        this.config.get('RPC'),
      );

      const contract = new ethers.Contract(
        this.config.get('CONTRACT_ADDRESS'),
        ABI,
        provider,
      );

      return contract;
    } catch (error) {
      console.log(error);
    }
  }

  async createVotingResultsMessage(data: any) {
    let message = '📊 **Current Voting Results**\n\n';

    // Iterate through the dynamic data
    data.forEach((entry, index) => {
      const [isActive, name, votes] = entry;

      // Add information for each proposal or candidate
      message += `**${index + 1}. ${name}:**\n`;
      message += `- Status: ${isActive ? 'Active' : 'Inactive'}\n`;
      message += `- Votes: ${votes}\n\n`;
    });

    // Add total votes
    const totalVotes = data.reduce((sum, entry) => sum + entry[2], 0);
    message += `Total Votes: ${totalVotes}\n\n`;

    // [Optional] Additional information or context about the ongoing voting process
    // Modify or remove this section based on your needs

    message += '#votingresults #communityengagement';

    return message;
  }
}
