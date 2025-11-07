import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Teacher])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
