import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctors } from 'src/db/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctors]),],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
