import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginCredentialsDto {
  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  @IsEmail(undefined, {
    message: 'Введён некорректный email-адрес',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  @IsString()
  @MinLength(6, { message: 'Пароль должен быть не короче 6 символов' })
  readonly password: string;
}