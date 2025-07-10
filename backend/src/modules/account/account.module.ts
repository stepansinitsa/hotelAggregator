import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AccountController } from './account.controller';
import { AuthService } from './account.service';
import { TokenValidationStrategy } from './token-validation.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer-jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AccountController],
  providers: [AuthService, TokenValidationStrategy],
  exports: [AuthService, TokenValidationStrategy, PassportModule],
})
export class AccountModule {}