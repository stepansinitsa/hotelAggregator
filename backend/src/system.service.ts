import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemService {
  greet(): string {
    return 'Добро пожаловать в систему управления бронированием отелей';
  }
}