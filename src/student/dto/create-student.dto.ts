import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNumber()
  age: number;

  @IsString()
  phone: string;
}
