import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDesenhoDto {
  @IsString()
  readonly filename: string;

  @IsString()
  readonly originalname: string;
  
}
