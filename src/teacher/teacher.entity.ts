import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../student/student.entity';
import { DaySchedule } from './day-schedule.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'teacher' })
  role: string;

  @OneToMany(() => Student, student => student.teacher)
  students: Student[];


  @Column({ type: 'json', nullable: true })
  lessonTimes: DaySchedule[];
}
