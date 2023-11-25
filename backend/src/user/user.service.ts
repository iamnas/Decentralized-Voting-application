import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: mongoose.Model<User>,

    private config: ConfigService,
  ) {}

  async findOne(_id: string): Promise<User> {
    const users = await this.userModel.findById(_id);
    return users;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  // async create(user: CreateUserDto): Promise<User> {

  //   const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  //   const res = await this.userModel.findOneAndUpdate(
  //     { userAddress: user.userAddress },
  //     { ...user },
  //     { options },
  //   ); //create(user);
  //   return res;
  // }

  async findOrCreate(userDto: CreateUserDto): Promise<User> {
    const { userAddress, name, gender, discordID, age } = userDto;

    const result = await this.userModel.findOneAndUpdate(
      { userAddress: userAddress },
      { $set: { userAddress, name, gender, discordID, age } },
      { upsert: true, returnOriginal: false },
    );

    return result;
  }
}
