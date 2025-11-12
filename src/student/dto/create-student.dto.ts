import { IsString, IsInt, IsEmail, Min, Max, Length, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(9, 15)
  phone: string;

  @IsInt()
  @Min(5)
  @Max(100)
  age: number;

  @IsOptional()
  @IsString()
  telegramId?: string;

  @IsOptional()
  groupId?: string;
}
