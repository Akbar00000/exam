import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('register')
  register(@Body() dto: CreateTeacherDto) {
    return this.teacherService.create(dto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.teacherService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.teacherService.remove(id);
  }
}
