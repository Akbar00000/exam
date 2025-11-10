import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async create(dto: CreateStudentDto, teacherId: number) {
    const student = this.studentRepo.create({ ...dto, teacherId });
    return await this.studentRepo.save(student);
  }

  async findAll(teacherId: number) {
    return await this.studentRepo.find({
      where: { teacherId },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number, teacherId: number) {
    const student = await this.studentRepo.findOne({ where: { id, teacherId } });
    if (!student) throw new NotFoundException('Ученик не найден');
    return student;
  }

  async update(id: number, dto: UpdateStudentDto, teacherId: number) {
    const student = await this.findOne(id, teacherId);
    Object.assign(student, dto);
    return await this.studentRepo.save(student);
  }

  async remove(id: number, teacherId: number) {
    const student = await this.findOne(id, teacherId);
    return await this.studentRepo.remove(student);
  }
}
