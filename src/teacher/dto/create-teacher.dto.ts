import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;
}
