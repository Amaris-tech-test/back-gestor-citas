import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from 'src/db/entities/appointment.entity';
import { UserModule } from '../user/user.module';

@Module({
  
  imports: [TypeOrmModule.forFeature([Appointments]),UserModule],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
