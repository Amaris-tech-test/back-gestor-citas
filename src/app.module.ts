import { Module } from '@nestjs/common';
import { DoctorModule } from './modules/doctor/doctor.module';

@Module({
  imports: [DoctorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
