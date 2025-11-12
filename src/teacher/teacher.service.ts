import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { UpdateTeacherScheduleDto } from './dto/update-teacher-schedule.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
  ) {}

  async createTeacher(dto: any) {
    const exist = await this.teacherRepo.findOne({ where: { email: dto.email } });
    if (exist) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);

    const teacher = this.teacherRepo.create({
      fullName: dto.username,
      email: dto.email,
      password: hashed,
      role: 'teacher',
    });

    return this.teacherRepo.save(teacher);
  }

  async getAllTeachers() {
    return this.teacherRepo.find();
  }

  async getTeacherById(id: number) {
    const teacher = await this.teacherRepo.findOne({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async deleteTeacher(id: number) {
    const result = await this.teacherRepo.delete(id);
    if (result.affected === 0) {
      return { message: 'Teacher not found' };
    }
    return { message: 'Teacher deleted successfully' };
  }

 
  async updateSchedule(teacherId: number, dto: UpdateTeacherScheduleDto) {
    const teacher = await this.teacherRepo.findOne({ where: { id: teacherId } });
    if (!teacher) throw new NotFoundException('Teacher not found');

    teacher.lessonTimes = dto.lessonTimes;
    return this.teacherRepo.save(teacher);
  }
}
