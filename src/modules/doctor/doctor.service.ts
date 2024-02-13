import { HttpException, HttpStatus, Injectable, Param, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctors } from 'src/db/entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctors)
    private readonly doctorRepository: Repository<Doctors>,
  ){}

  async createDoctor(doctor: any) {	
    try {
      return await this.doctorRepository.save(doctor);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getDoctors() {	
    try {
      return await this.doctorRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getDoctorsBySpecialty(specialtyId: any){
    try {
      const infoDoctors = await this.doctorRepository.find({
        where: {specialty: {id: specialtyId}},
      })
      return infoDoctors;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
