import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  const usersService = { send: jest.fn() };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: 'USERS_SERVICE', useValue: usersService }],
    }).compile();

    appController = app.get<AppController>(AppController);
    usersService.send.mockReset();
  });

  it('transmet la vérification de santé au service utilisateurs', async () => {
    const stream = of('Hello World!');
    usersService.send.mockReturnValue(stream);

    await expect(appController.getHello()).resolves.toBe(stream);
    expect(usersService.send).toHaveBeenCalledWith({ cmd: 'get_hello' }, {});
  });
});
