import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  age: number;

  @Column()
  phone: string;

  @ManyToOne(() => User, (user) => user.students, { onDelete: 'CASCADE' })
  teacher: User;

  @Column()
  teacherId: number;
}
