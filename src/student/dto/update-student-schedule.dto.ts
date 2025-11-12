import { IsArray } from 'class-validator';
import { ScheduleDto } from '../../teacher/dto/schedule.dto';

export class UpdateStudentScheduleDto {
  @IsArray()
  lessonTimes: ScheduleDto[];
}
