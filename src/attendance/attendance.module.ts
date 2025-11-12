import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './attendance.entity';
import { Student } from '../student/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Student])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
