import { IsOptional, IsString } from "class-validator";

export class appointmentRequestDto {
  id?: string;

  @IsOptional()
  @IsString()
  status:string;
  
  @IsString()
  appointmentDate: Date;

  @IsString()
  doctor: string;

  @IsString()
  user: string;

  @IsString()
  specialty: string;
}

export class appointmentUpdateRequestDto {
  @IsOptional()
  @IsString()
  status:string;

  @IsOptional()
  @IsString()
  appointmentDate: Date;

  @IsOptional()
  @IsString()
  doctor: string;

  @IsOptional()
  @IsString()
  user: string;

  @IsOptional()
  @IsString()
  specialty: string;
}