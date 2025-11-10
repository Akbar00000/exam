import { Student } from 'src/student/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export type UserRole = 'admin' | 'teacher' | 'student';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'teacher', 'student'], default: 'student' })
  role: UserRole;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ nullable: true })
  resetCode?: string;


  @OneToMany(() => Student, (student) => student.teacher)
  students?: Student[];
}
