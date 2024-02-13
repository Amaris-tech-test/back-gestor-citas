import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialties } from 'src/db/entities/specialty.entity';
import { Repository } from 'typeorm';
import { specialtyRequestDto } from './specialty.dto';


@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialties)
    private readonly specialtiesRepository: Repository<Specialties>,
  ){}

  async createSpecialty(specialtyInput:specialtyRequestDto): Promise<any>{

    try {
      const specialty = this.specialtiesRepository.create(specialtyInput);
      return await this.specialtiesRepository.save(specialty)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSpecialties(): Promise<Specialties[]> {
    try {
      return await this.specialtiesRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

