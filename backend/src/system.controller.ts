import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('api')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('/')
  welcome(): string {
    return this.systemService.greet();
  }
}