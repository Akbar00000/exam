import { IsEnum, IsString, Matches } from 'class-validator';
import { Day } from '../day-schedule.entity';

export class ScheduleDto {
  @IsEnum(Day)
  day: Day;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime must be HH:mm' })
  startTime: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'endTime must be HH:mm' })
  endTime: string;
}
