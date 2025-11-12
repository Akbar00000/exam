import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { CreateAttendanceDto } from './dto/mark-attendance.dto';
import { Student } from '../student/student.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance) private attendanceRepo: Repository<Attendance>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  async markAttendance(dto: CreateAttendanceDto) {
    const student = await this.studentRepo.findOne({
      where: { firstName: dto.firstName, lastName: dto.lastName },
    });
    if (!student) throw new NotFoundException('Student not found');

    const attendance = this.attendanceRepo.create({
      student,
      present: dto.present,
      date: dto.date ? new Date(dto.date) : new Date(),
    });

    return this.attendanceRepo.save(attendance);
  }

  async getAttendanceSummary() {
    const attendances = await this.attendanceRepo.find({ relations: ['student'] });

    const attendance = attendances.map(a => ({
      student: `${a.student.firstName} ${a.student.lastName}`,
      present: a.present,
      date: a.date,
    }));

    const totalPresent = attendances.filter(a => a.present).length;
    const totalAbsent = attendances.filter(a => !a.present).length;

    return { attendance, totalPresent, totalAbsent };
  }
}
