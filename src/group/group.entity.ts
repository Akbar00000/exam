import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../auth/user.entity';
import { Student } from '../student/student.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.groupsCreated, { onDelete: 'SET NULL' })
  createdBy: User;

  @Column({ nullable: true })
  createdById: number;

  @OneToMany(() => Student, student => student.group)
  students: Student[];
}
