import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  @IsEmail(undefined, {
    message: 'Введён некорректный email-адрес',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  @IsString()
  @MinLength(6, { message: 'Пароль должен быть не короче 6 символов' })
  readonly password: string;

  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  
}