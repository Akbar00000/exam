import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Group } from '../group/group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: 'admin' | 'teacher';

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @CreateDateColumn()
  createdAt: Date;

 
  @OneToMany(() => Student, student => student.teacher)
  students: Student[];

 
  @OneToMany(() => Group, group => group.createdBy)
  groupsCreated: Group[];
}
