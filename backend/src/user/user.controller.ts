import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Post()
  async createUser(
    @Body()
    user: CreateUserDto,
  ): Promise<User> {
    return this.userService.findOrCreate(user);
  }
}
