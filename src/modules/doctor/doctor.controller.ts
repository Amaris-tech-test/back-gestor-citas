import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { uuid } from 'uuidv4';

import { DoctorService } from './doctor.service';
import { doctorRequestDto } from './doctor.dto';
import { success } from 'src/utils/constants/global.constants';
import { Auth } from '../user/decorators/auth.decorator';
import { ValidRoles } from '../user/interfaces/valid-roles';

@Controller('doctor')
@Auth()
export class DoctorController {
  constructor(private doctorService: DoctorService) { }	

  @Post()
  @Auth(ValidRoles.admin)
  async createDoctor(
    @Body() body: doctorRequestDto,
  ) {
    const data = await this.doctorService.createDoctor(body)
    return {
      message: success.OK,
      statusCode: 200,
      data,
    }
  }

  @Get()
  async findAllDoctors() {
    const data = await this.doctorService.getDoctors()
    return {
      message: success.OK,
      statusCode: 200,
      data,
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
