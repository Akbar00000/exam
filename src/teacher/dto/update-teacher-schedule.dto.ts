import { IsArray } from 'class-validator';
import { ScheduleDto } from './schedule.dto';

export class UpdateTeacherScheduleDto {
  @IsArray()
  lessonTimes: ScheduleDto[];
}
