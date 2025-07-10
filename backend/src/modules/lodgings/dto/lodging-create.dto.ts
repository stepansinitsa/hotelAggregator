import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LodgingCreateDto {
  @IsNotEmpty({
    message: 'Для создания объекта размещения необходимо указать его название',
  })
  @MinLength(5, { message: 'Название должно содержать минимум 5 символов' })
  @MaxLength(50, { message: 'Название не может превышать 50 символов' })
  @IsString()
  readonly name: string;

  @IsOptional()
  @MaxLength(5000, { message: 'Описание не должно превышать 5000 символов' })
  @IsString()
  readonly description?: string;

  @IsOptional()
  images?: any;
}