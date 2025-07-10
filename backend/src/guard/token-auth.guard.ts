import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TokenAuthGuard extends AuthGuard('bearer-jwt') {
  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(err, user) {
    if (err) {
      throw err;
    }

    if (!user) {
      throw new UnauthorizedException(
        'Пожалуйста, войдите в систему для продолжения',
      );
    }
    return user;
  }
}