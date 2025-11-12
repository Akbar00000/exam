import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramBotService } from './telegram-bot.service';
import { Murojat } from '../murojat/murojat.entity';
import { Payment } from '../payments/payment.entity';
import { Student } from '../student/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Murojat, Payment, Student]), 
  ],
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
