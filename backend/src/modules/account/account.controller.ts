import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from 'src/guard/token-auth.guard';
import { AuthService } from './account.service';
import { AccountResponseDto } from './dto/account-response.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('api/account')
export class AccountController {
  constructor(private accountService: AuthService) {}

  @Post('auth/signup')
  regist(@Body() registrationData: RegisterUserDto): Promise<AccountResponseDto> {
    return this.accountService.regist(registrationData);
  }

  @Post('auth/signin')
  login(@Body() credentials: LoginCredentialsDto): Promise<AccountResponseDto> {
    return this.accountService.login(credentials);
  }

  @Get('auth/checkauth')
  @UseGuards(TokenAuthGuard)
  verifySession(
    @Query() data: { email: string },
  ): Promise<{ role: string; id: string }> {
    return this.accountService.checkAuth(data);
  }
}