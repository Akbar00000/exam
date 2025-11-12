import { IsInt, Min, Max, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  studentId: number;

  @IsInt()
  @Min(1)
  @Max(100000000) 
  amount: number;

  @IsString()
  method: string;
}
