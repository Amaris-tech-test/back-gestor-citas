import { Body, Controller, Get, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { createUserDto } from './user.dto';
import { success } from 'src/utils/constants/global.constants';
import { LoginUserDto } from './login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { Users } from 'src/db/entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';

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

  @Post('login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ) {
    const data = await this.userService.authLogin(loginUserDto);
    return {
      message: success.OK,
      statusCode: 200,
      data,
    }
  }

  @Get('private3')
  @Auth( ValidRoles.admin )
  privateRoute3(
    @GetUser() user: Users
  ) {

    return {
      ok: true,
      user
    }
  }

}
