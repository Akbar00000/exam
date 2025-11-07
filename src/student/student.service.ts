import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Teacher } from './teacher.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
  ) {}

  async create(dto: CreateStudentDto) {
    const teacher = await this.teacherRepo.findOneBy({ id: dto.teacherId });
    if (!teacher) throw new Error('Teacher not found');

    const student = this.studentRepo.create({ ...dto, teacher });
    return this.studentRepo.save(student);
  }

  findAll() {
    return this.studentRepo.find({ relations: ['teacher'] });
  }

  findOne(id: number) {
    return this.studentRepo.findOne({ where: { id }, relations: ['teacher'] });
  }

  async update(id: number, dto: UpdateStudentDto) {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) throw new Error('Student not found');

    return this.studentRepo.update(id, dto);
  }

  async remove(id: number) {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) throw new Error('Student not found');

    return this.studentRepo.delete(id);
  }


  findByTeacher(teacherId: number) {
    return this.studentRepo.find({
      where: { teacher: { id: teacherId } },
      relations: ['teacher'],
    });
  }
}
