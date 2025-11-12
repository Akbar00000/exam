import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './create-payment.dto';
import { Student } from '../student/student.entity';
import { PaymentMethod } from '../enums/payment-method.enum';

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

    
    let method: PaymentMethod;
    switch (dto.method.toLowerCase()) {
      case 'cash':
        method = PaymentMethod.CASH;
        break;
      case 'card':
        method = PaymentMethod.CARD;
        break;
      case 'online':
        method = PaymentMethod.ONLINE;
        break;
      case 'telegram':
        method = PaymentMethod.TELEGRAM;
        break;
      default:
        throw new BadRequestException('Noto‘g‘ri to‘lov turi');
    }

    const payment = this.paymentRepo.create({
      amount: dto.amount,
      method,
      student,
    });

    await this.paymentRepo.save(payment);

    return { message: 'To‘lov muvaffaqiyatli saqlandi', payment };
  }

  findAll() {
    return this.paymentRepo.find({ relations: ['student'] });
  }
}
