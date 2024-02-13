import { Body, Controller, Post } from '@nestjs/common';
import { uuid } from 'uuidv4';

import { UserService } from './user.service';
import { createUserDto } from './user.dto';
import { success } from 'src/utils/constants/global.constants';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }	

  @Post()
  async createDoctor(
    @Body() createUserDto: createUserDto,
  ) {
    const data = await this.userService.createUser(createUserDto);
    return {
      message: success.OK,
      statusCode: 200,
      data,
    }
  }
}
