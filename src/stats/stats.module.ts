import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Student } from '../student/student.entity';
import { User } from '../auth/user.entity';
import { Group } from '../group/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, User, Group])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
