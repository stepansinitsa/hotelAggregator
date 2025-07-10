import { IsOptional, IsString } from 'class-validator';

export class UpdateAccommodationDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
   images?: any;
}