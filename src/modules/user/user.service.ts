import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Users } from 'src/db/entities/user.entity';
import { createUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(createUserDto: createUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
    } catch (error) {
      this.handleDefaultErrors(error);
      console.log(error);
    }
  }

  private handleDefaultErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);
    throw new InternalServerErrorException('Check logs');
  }
}
