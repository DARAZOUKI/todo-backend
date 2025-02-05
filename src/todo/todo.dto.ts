import { IsEnum, IsNotEmpty, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsOptional()
  @MaxLength(200)
  description?: string;

  @IsOptional()
  @IsEnum(['Not started', 'Ongoing', 'Completed'])
  status?: string;
}
