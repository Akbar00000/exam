import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { Group } from './group/group.entity';
import { GroupModule } from './group/group.module';
import { StatsModule } from './stats/stats.module';
import { TelegramBotModule } from './bot/telegram-bot.module';
import { MurojatModule } from './murojat/murojat.module';
import { PaymentModule } from './payments/payment.module';
import { AttendanceModule } from './attendance/attendance.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, 
    }),
    AuthModule,
    StudentModule,
    TeacherModule,
    GroupModule,
    StatsModule,
    TelegramBotModule,
    MurojatModule,
    PaymentModule,
    AttendanceModule,
  ],
})
export class AppModule {}
