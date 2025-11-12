import {  Entity,  PrimaryGeneratedColumn,  Column, ManyToOne,  CreateDateColumn,} from 'typeorm';
import { Student } from '../student/student.entity';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  method: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.SUCCESS,
  })
  status: PaymentStatus;

  @ManyToOne(() => Student, (student) => student.paymentList, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @CreateDateColumn()
  createdAt: Date;
}
