import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../auth/user.entity';
import { Group } from '../group/group.entity';
import { Payment } from '../payments/payment.entity';
import { Day, DaySchedule } from '../teacher/day-schedule.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'teacherId' })
  teacher: User;

  @ManyToOne(() => Group, group => group.students)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'addedById' })
  addedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  joinedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  leftAt: Date;

  @OneToMany(() => Payment, payment => payment.student)
  paymentList: Payment[];

  @Column({ type: 'varchar', nullable: true })
  telegramId?: string;


  @Column({ type: 'json', nullable: true })
  lessonTimes: DaySchedule[];
}
