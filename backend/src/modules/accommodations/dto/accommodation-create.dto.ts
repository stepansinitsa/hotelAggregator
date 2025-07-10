import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ID } from '../../../infrastructure/types.global';

export class AccommodationCreateDto {
  @IsNotEmpty({
    message: 'Для создания номера необходимо указать ID связанного жилья',
  })
  @IsString()
  readonly lodgingId: ID;

  @IsNotEmpty({
    message: 'Название обязательно для заполнения',
  })
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  images?: any;

  @IsOptional()
    isActive: boolean;
}