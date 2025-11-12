import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { User } from 'src/auth/user.entity';
import { Student } from 'src/student/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, Student])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
