import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { uuid } from 'uuidv4';

import { appointmentRequestDto } from './appointment.dto';
import { AppointmentService } from './appointment.service';
import { ApiResponse } from 'src/db/entities/response.dto';
import { success } from 'src/utils/constants/global.constants';

@Controller('appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get('/:userId/')
  async getAppointmentByUserId(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<ApiResponse> {
    const data = await this.appointmentService.getAppointmentsByUserId(userId);
    return {
      message: success.OK,
      statusCode: 200,
      data,
    };
  }

  @Post()
  async createAppointment(@Body() body: appointmentRequestDto) {
    body.id = uuid();
    const data = await this.appointmentService.createAppointment(body);
    return {
      message: success.OK,
      statusCode: 200,
      data: {
        status: data.status
      }
    };
  }

  @Put('update/:appointmentId')
  async updateAppointment(
    @Param('appointmentId', new ParseUUIDPipe()) appointmentId:string,
    @Body() appointmentData: appointmentRequestDto
  ): Promise<any> {
    const data = await this.appointmentService.updateAppointment(appointmentId, appointmentData)
    return {
      message: success.OK,
      statusCode: 200,
      data,
    }
  }
}