import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserRegistrationDto {
  @IsNotEmpty({ message: 'Для регистрации необходимо указать email' })
  @IsEmail(undefined, { message: 'Некорректный формат email-адреса' })
  readonly email?: string;

  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  @IsString()
  readonly passwordHash: string;

  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsString()
  readonly role?: string;
}