import { Test, TestingModule } from '@nestjs/testing';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';

describe('SystemController', () => {
  let systemController: SystemController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SystemController],
      providers: [SystemService],
    }).compile();

    systemController = moduleFixture.get<SystemController>(SystemController);
  });

  describe('greeting', () => {
    it('should return welcome message', () => {
      expect(systemController.welcome()).toBe('Добро пожаловать в систему!');
    });
  });
});