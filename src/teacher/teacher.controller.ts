import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './dto/create-teacher.dto';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() dto: TeacherDto) {
    return this.teacherService.createTeacher(dto);
  }

  @Get()
  getAll() {
    return this.teacherService.getAllTeachers();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.teacherService.getTeacherById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.teacherService.deleteTeacher(id);
  }
}
