import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from 'src/db/entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointments)
    private readonly appointmentRepository: Repository<Appointments>,
  ) {}

  async createAppointment(appointment: any) {
    try {
      const existingAppointment = await this.appointmentRepository.findOne({
        where: {
          doctor: appointment.doctorId,
          appointmentDate: appointment.appointmentDate,
        },
      });

      if (existingAppointment) {
        throw new HttpException(
          'El doctor ya tiene una cita agendada en este horario',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAppointmentsByUserId(userId: string): Promise<any[]> {
    try {
      const appointments = await this.appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('appointment.user', 'user')
        .leftJoinAndSelect('appointment.specialty', 'specialty')
        .where('user.id = :userId', { userId })
        .andWhere('appointment.status = :status', { status: 'agendada' })
        .select([
          'appointment.id',
          'appointment.appointmentDate',
          'doctor.name',
          'doctor.lastname',
          'doctor.id',
          'specialty.specialty',
          'specialty.id',
          'user.name',
          'user.lastname',
          
        ])
        .getMany();
      return appointments;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  async updateAppointment(
    appointmentId: any,
    appointmentData: any,
  ): Promise<void> {
    try {
      const appointmentToUpdate = await this.appointmentRepository.findOneBy({
        id: appointmentId,
      });

      if (!appointmentToUpdate) {
        throw new Error(`La cita no existe`);
      }

      const newData = {
        ...appointmentToUpdate,
        ...appointmentData,
      };

      const updatedAppointment = await this.appointmentRepository.save(newData);

      return updatedAppointment;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
