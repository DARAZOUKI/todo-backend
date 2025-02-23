import { IsEnum, IsNotEmpty, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsOptional()
  @MaxLength(200, { message: 'Description must not exceed 200 characters' })
  description?: string;

  @IsOptional()
  @IsEnum(['Not started', 'Ongoing', 'Completed'])
  status?: string;
}
