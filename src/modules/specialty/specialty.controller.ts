import { Body, Controller, Get, Post } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { specialtyRequestDto } from './specialty.dto';
import { uuid } from 'uuidv4';
import { success } from 'src/utils/constants/global.constants';
import { ApiResponse } from 'src/db/entities/response.dto';

@Controller('specialty')
export class SpecialtyController {
  constructor(private specialtyService: SpecialtyService) {}

  @Post()
  async createSpecialty(@Body() body: specialtyRequestDto) {
    const data = await this.specialtyService.createSpecialty(body);
    return {
      message: success.OK,
      statusCode: 200,
      data,
    };
  }

  @Get()
  async findAllSpecialties(): Promise<ApiResponse> {
    const data = await this.specialtyService.getSpecialties();
    return {
      message: success.OK,
      statusCode: 200,
      data,
    };
  }
}
