import { Module } from '@nestjs/common';
import { DoctorModule } from './modules/doctor/doctor.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctors } from './db/entities/doctor.entity';
import { Specialties } from './db/entities/specialty.entity';
import { UserModule } from './modules/user/user.module';
import { Users } from './db/entities/user.entity';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { SpecialtyModule } from './modules/specialty/specialty.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Doctors, Specialties, Users],
      autoLoadEntities: true,
      synchronize: true,
    }),
    DoctorModule,
    UserModule,
    AppointmentModule,
    SpecialtyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 
