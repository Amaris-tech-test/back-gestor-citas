import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { uuid } from 'uuidv4';

import { DoctorService } from './doctor.service';
import { doctorRequestDto } from './doctor.dto';
import { success } from 'src/utils/constants/global.constants';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) { }	


  @Post()
  async createDoctor(
    @Body() body: doctorRequestDto,
  ) {
    try {
      body.id = uuid();
      this.doctorService.createDoctor(body);
    } catch (error) {
      console.log(error)
    }
  }

  @Get()
  async findAllDoctors() {
    try {
      return this.doctorService.getDoctors();
    } catch (error) {
      console.log(error)
    }
  }

  @Get('/doctorBySpecialty/:specialtyId')
  async getDoctorBySpecialties(
    @Param('specialtyId', new ParseUUIDPipe()) specialtyId:string,
  ): Promise<any> {
    const data = await this.doctorService.getDoctorsBySpecialty(specialtyId)
    return {
      message: success.OK,
      statusCode: 200,
      data,
    }
  }
}
