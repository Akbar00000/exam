import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async create(dto: CreateTeacherDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const teacher = this.teacherRepo.create({
      ...dto,
      password: hashedPassword,
      role: 'teacher',
    });
    return this.teacherRepo.save(teacher);
  }

  async findAll() {
    return this.teacherRepo.find({ relations: ['students'] });
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepo.findOne({
      where: { id },
      relations: ['students'],
    });
    if (!teacher) throw new NotFoundException('Учитель не найден');
    return teacher;
  }

  async findByEmail(email: string) {
    return this.teacherRepo.findOne({ where: { email } });
  }

  async remove(id: number) {
    const teacher = await this.findOne(id);
    return this.teacherRepo.remove(teacher);
  }
}
