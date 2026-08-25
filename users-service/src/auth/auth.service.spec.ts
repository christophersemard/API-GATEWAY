import { AuthService } from './auth.service';

describe('AuthService', () => {
  const service = new AuthService({} as never, {} as never);

  it('hache puis vérifie un mot de passe', async () => {
    const hash = await service.hashPassword('mot-de-passe-local');

    expect(hash).not.toBe('mot-de-passe-local');
    await expect(
      service.comparePasswords('mot-de-passe-local', hash),
    ).resolves.toBe(true);
    await expect(service.comparePasswords('incorrect', hash)).resolves.toBe(
      false,
    );
  });
});
