import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StudentsService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('teacher')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() dto: CreateStudentDto, @Req() req) {
    const teacherId = req.user.id;
    return this.studentsService.create(dto, teacherId);
  }

  @Get()
  findAll(@Req() req) {
    const teacherId = req.user.id;
    return this.studentsService.findAll(teacherId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req) {
    const teacherId = req.user.id;
    return this.studentsService.findOne(id, teacherId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateStudentDto,
    @Req() req,
  ) {
    const teacherId = req.user.id;
    return this.studentsService.update(id, dto, teacherId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    const teacherId = req.user.id;
    return this.studentsService.remove(id, teacherId);
  }
}
