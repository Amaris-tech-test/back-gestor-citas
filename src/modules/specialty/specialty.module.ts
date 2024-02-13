import { Module } from '@nestjs/common';
import { SpecialtyController } from './specialty.controller';
import { SpecialtyService } from './specialty.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialties } from 'src/db/entities/specialty.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Specialties]),UserModule],
  controllers: [SpecialtyController],
  providers: [SpecialtyService]
})
export class SpecialtyModule {}
