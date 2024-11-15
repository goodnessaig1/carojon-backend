import {
  Controller,
  Post,
  Body,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserInput } from 'src/inputs/create-user.input';
import { UserWithBusiness } from 'src/inputs/user-response-with-business';
import { UserService } from 'src/service/users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserInput: CreateUserInput,
  ): Promise<UserWithBusiness> {
    try {
      return await this.userService.createUser(createUserInput);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Email already exists.');
      }
      throw error;
    }
  }
}
