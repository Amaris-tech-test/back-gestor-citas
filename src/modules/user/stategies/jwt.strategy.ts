import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Users } from 'src/db/entities/user.entity';
import { JWTPayload } from '../interfaces/jwtPayload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWTPayload): Promise<Users> {
    const { _id } = payload;

    const user = await this.usersRepository.findOneBy({id: _id});

    if(!user)
      throw new UnauthorizedException('Token not valid');

    if(!user.isActive)
      throw new UnauthorizedException('User is inactive');

    return user;
  }
}
