import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  // CREATE 
  async create(dto: CreateStudentDto, teacherId: number, addedById: number) {
    const existing = await this.studentRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already exists');

    const teacher = await this.studentRepo.manager.findOne(User, { where: { id: teacherId } });
    const addedBy = await this.studentRepo.manager.findOne(User, { where: { id: addedById } });
    if (!teacher || !addedBy) throw new NotFoundException('Teacher yoki addedBy topilmadi');

    const student = this.studentRepo.create({
      ...dto,
      teacher,
      addedBy,
      
      joinedAt: new Date(), 
    });

    return this.studentRepo.save(student);
  }

  // GET ALL 
  async findAllByTeacher(teacherId: number) {
    return this.studentRepo.find({
      where: { teacher: { id: teacherId } },
      relations: ['teacher', 'group', 'addedBy'],
    });
  }

  // GET ONE 
  async findOneByTeacher(id: number, teacherId: number) {
    const student = await this.studentRepo.findOne({
      where: { id, teacher: { id: teacherId } },
      relations: ['teacher', 'group', 'addedBy'],
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  // UPDATE 
  async updateByTeacher(id: number, teacherId: number, dto: CreateStudentDto) {
    const student = await this.studentRepo.findOne({
      where: { id, teacher: { id: teacherId } },
    });
    if (!student) throw new NotFoundException('Student not found');

    Object.assign(student, dto);
    return this.studentRepo.save(student);
  }

  // DELETE
  async removeByTeacher(id: number, teacherId: number) {
    const student = await this.studentRepo.findOne({
      where: { id, teacher: { id: teacherId } },
    });
    if (!student) throw new NotFoundException('Student not found');

    
    student.leftAt = new Date(); 
    await this.studentRepo.save(student);

    return { message: 'Student marked as left successfully' };
  }
}