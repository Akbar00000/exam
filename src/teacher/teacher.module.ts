import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {}
