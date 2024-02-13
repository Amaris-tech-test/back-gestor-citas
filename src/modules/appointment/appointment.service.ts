import { Injectable } from '@nestjs/common';
import { appointmentRequestDto } from './appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from 'src/db/entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointments)
    private readonly appointmentRepository: Repository<Appointments>,
  ){}


  async createAppointment(appointment: any) {	
    try {
      return await this.appointmentRepository.save(appointment);
    } catch (error) {
      console.log(error)
      
    }
  }

  async getAppointmentsByUserId(userId: string): Promise<any[]> {
    try {
      const appointments = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor','doctor')
      .leftJoinAndSelect('appointment.user', 'user')
      .leftJoinAndSelect('appointment.specialty', 'specialty')
      .where('user.id = :userId',  {userId})
      .andWhere('appointment.status = :status', {status: 'agendada'})
      .select([
        'appointment.id',
        'appointment.appointmentDate',
        'doctor.name',
        'doctor.lastname',
        'specialty.specialty',
        'user.name',
        'user.lastname',
      ])
      .getMany();
      return appointments;
    } catch (error) {
      console.log(error);
    }
  } 

  async updateAppointment(appointmentId: any,  appointmentData:any): Promise<void>{
    try {
      const appointmentToUpdate = await this.appointmentRepository.findOneBy({id: appointmentId});

      if(!appointmentToUpdate){
        throw new Error(`La cita no existe`);
      }

      const newData = {
        ...appointmentToUpdate,
        ...appointmentData,
      }

      const updatedAppointment = await this.appointmentRepository.save(newData);

      return updatedAppointment
      
    } catch (error) {
      console.log(error);
    }
  }
}