import { Controller, Post, Body, UseGuards, Req, Get, Param, Put, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStudentDto } from './dto/create-student.dto';

@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentController {
  constructor(private svc: StudentService) {}

  // CREATE
  @Post()
  create(@Req() req, @Body() dto: CreateStudentDto) {
    return this.svc.create(dto, req.user.sub, req.user.sub);
  }

  // GET ALL
  @Get()
  findAll(@Req() req) {
    return this.svc.findAllByTeacher(req.user.sub);
  }

  // GET ONE
  @Get(':id')
  findOne(@Req() req, @Param('id') id: number) {
    return this.svc.findOneByTeacher(id, req.user.sub);
  }

  // UPDATE
  @Put(':id')
  update(@Req() req, @Param('id') id: number, @Body() dto: CreateStudentDto) {
    return this.svc.updateByTeacher(id, req.user.sub, dto);
  }

  // DELETE
  @Delete(':id')
  remove(@Req() req, @Param('id') id: number) {
    return this.svc.removeByTeacher(id, req.user.sub);
  }
}
