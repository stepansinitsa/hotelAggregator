import { IsOptional, IsString } from 'class-validator';

export class UpdateLodgingDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  images?: any;
}