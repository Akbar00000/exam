import { Controller, Post, Body, Get } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/mark-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('mark')
  async mark(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.markAttendance(dto);
  }

  @Get('today-attendance')
  async summary() {
    return this.attendanceService.getAttendanceSummary();
  }
}
