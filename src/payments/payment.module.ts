import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Student } from '../student/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Student])],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
