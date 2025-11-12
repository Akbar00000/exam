import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './create-payment.dto';
import { Student } from '../student/student.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  async createPayment(dto: CreatePaymentDto) {
    const student = await this.studentRepo.findOne({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student topilmadi');

    const payment = this.paymentRepo.create({
      amount: dto.amount,
      method: dto.method,
      student,
    });

    await this.paymentRepo.save(payment);

    return { message: 'To‘lov muvaffaqiyatli saqlandi', payment };
  }

  findAll() {
    return this.paymentRepo.find({ relations: ['student'] });
  }
}
