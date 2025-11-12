import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../student/student.entity';
import { User } from '../auth/user.entity';
import { Group } from '../group/group.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Group) private groupRepo: Repository<Group>,
  ) {}

  // OVERVIEW 
  async getOverview() {
    const totalStudents = await this.studentRepo.count();
    const totalTeachers = await this.userRepo.count({ where: { role: 'teacher' } });
    const totalGroups = await this.groupRepo.count();

    
    const studentsJoinedThisMonth = await this.studentRepo
      .createQueryBuilder('student')
      .where(
        'EXTRACT(MONTH FROM student.joinedAt) = EXTRACT(MONTH FROM CURRENT_DATE)',
      )
      .andWhere(
        'EXTRACT(YEAR FROM student.joinedAt) = EXTRACT(YEAR FROM CURRENT_DATE)',
      )
      .getCount();

    const studentsLeftThisMonth = await this.studentRepo
      .createQueryBuilder('student')
      .where(
        'EXTRACT(MONTH FROM student.leftAt) = EXTRACT(MONTH FROM CURRENT_DATE)',
      )
      .andWhere(
        'EXTRACT(YEAR FROM student.leftAt) = EXTRACT(YEAR FROM CURRENT_DATE)',
      )
      .getCount();

    return {
      totalStudents,
      totalTeachers,
      totalGroups,
      studentsJoinedThisMonth,
      studentsLeftThisMonth,
    };
  }

  
  async getMonthlyStats(year: number) {
    
    const joinedStats: { month: number; joined: number }[] = await this.studentRepo
      .createQueryBuilder('student')
      .select("EXTRACT(MONTH FROM student.joinedAt)", "month")
      .addSelect("COUNT(*)", "joined")
      .where("EXTRACT(YEAR FROM student.joinedAt) = :year", { year })
      .andWhere("student.joinedAt IS NOT NULL")
      .groupBy("month")
      .orderBy("month", "ASC")
      .getRawMany();

    
    const leftStats: { month: number; left: number }[] = await this.studentRepo
      .createQueryBuilder('student')
      .select("EXTRACT(MONTH FROM student.leftAt)", "month")
      .addSelect("COUNT(*)", "left")
      .where("EXTRACT(YEAR FROM student.leftAt) = :year", { year })
      .andWhere("student.leftAt IS NOT NULL")
      .groupBy("month")
      .orderBy("month", "ASC")
      .getRawMany();

    
    const finalStats: { month: number; joined: number; left: number }[] = [];

    
    for (let month = 1; month <= 12; month++) {
      finalStats.push({ month, joined: 0, left: 0 });
    }

    
    joinedStats.forEach(stat => {
      const monthIndex = finalStats.findIndex(s => s.month === Number(stat.month));
      if (monthIndex !== -1) {
        finalStats[monthIndex].joined = Number(stat.joined);
      }
    });

    
    leftStats.forEach(stat => {
      const monthIndex = finalStats.findIndex(s => s.month === Number(stat.month));
      if (monthIndex !== -1) {
        finalStats[monthIndex].left = Number(stat.left);
      }
    });

    return finalStats;
  }
}