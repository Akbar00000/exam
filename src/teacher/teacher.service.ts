import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/user.entity';
import { TeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createTeacher(dto: TeacherDto) {
    const exist = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exist) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);

    const teacher = this.userRepo.create({
      username: dto.username,
      email: dto.email,
      password: hashed,
      role: 'teacher',
    });

    return this.userRepo.save(teacher);
  }

  async getAllTeachers() {
    return this.userRepo.find({ where: { role: 'teacher' } });
  }

  async getTeacherById(id: number) {
    return this.userRepo.findOne({ where: { id, role: 'teacher' } });
  }

async deleteTeacher(id: number) {
  const result = await this.userRepo.delete({ id, role: 'teacher' });

  if (result.affected === 0) {
    return { message: 'Teacher not found' };
  }

  return { message: 'Teacher deleted successfully' };
}

}