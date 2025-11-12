import { Column } from 'typeorm';

export enum Day {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

export class DaySchedule {
  @Column({ type: 'enum', enum: Day })
  day: Day;

  @Column()
  startTime: string; 

  @Column()
  endTime: string;
}
