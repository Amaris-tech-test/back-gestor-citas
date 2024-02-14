import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Users } from 'src/db/entities/user.entity';
import { createUserDto } from './user.dto';
import { LoginUserDto } from './login-user.dto';
import { JWTPayload } from './interfaces/jwtPayload.interface';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: createUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
     
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ _id: user.id }),
      };
    } catch (error) {
      this.handleDefaultErrors(error);
      console.log(error);
    }
  }

  async authLogin(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id:true },
    });

    if (!user) {
      throw new UnauthorizedException(`Email is not valid `);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(`Password is not valid `);
    }

    delete user.password;
    return {
      ...user,
      token: this.getJwtToken({ _id: user.id }),
    };
  }

  private getJwtToken(payload: JWTPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDefaultErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);
    throw new InternalServerErrorException('Check logs');
  }
}
