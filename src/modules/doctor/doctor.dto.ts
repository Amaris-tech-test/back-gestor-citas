import { IsString } from "class-validator";

export class doctorRequestDto {
  id?: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  specialty?: string;
}