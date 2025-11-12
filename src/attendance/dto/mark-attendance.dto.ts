import { IsBoolean, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  present: boolean;

  @IsOptional()
  @IsDateString()
  date?: string; 
}
