import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AccountResponseDto } from './dto/account-response.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async regist(RegisterUserDto: RegisterUserDto): Promise<AccountResponseDto> {
    const { email, password, name, phone } = RegisterUserDto;

    const userData = await this.userService.findByEmail(email);
    if (userData) {
      throw new ConflictException(
        'Пользователь с указанным email уже существует!',
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await this.userService.register({
      email,
      passwordHash,
      name,
      phone: phone || 'Не указан',
    });

    const token = this.jwtService.sign({ email: newUser.email });
    return { token, role: newUser.role, id: newUser._id.toString() };
  }

  async login(LoginCredentialsDto: LoginCredentialsDto): Promise<AccountResponseDto> {
    const { email, password } = LoginCredentialsDto;

    const userData = await this.userService.findByEmail(email);
    if (!userData) {
      throw new NotFoundException('Неправильный email или пароль!');
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      userData.passwordHash,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Неправильный email или пароль!');
    }

    const token = this.jwtService.sign({ email: userData.email });
    return { token, role: userData.role, id: userData._id.toString() };
  }

  async checkAuth(data: {
    email: string;
  }): Promise<{ role: string; id: string }> {
    const { email } = data;

    const userData = await this.userService.findByEmail(email);
    if (!userData) {
      throw new NotFoundException('Неправильный email или пароль!');
    }

    return { role: userData.role, id: userData._id.toString() };
  }
}