import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Student } from '../student/student.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  amount: number;

  @Column()
  method: string;

  @ManyToOne(() => Student, student => student.paymentList, { onDelete: 'CASCADE' })
  student: Student;

  @CreateDateColumn()
  createdAt: Date;
}
