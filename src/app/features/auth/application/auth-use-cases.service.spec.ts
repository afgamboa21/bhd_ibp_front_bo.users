import { TestBed } from '@angular/core/testing';
import { AuthRepository } from '../models/auth.repository';
import { AuthUseCasesService } from './auth-use-cases.service';
import { AuthUser } from '../models/auth-user';

const AuthRepositoryMock = jasmine.createSpyObj<AuthRepository>(
  'AuthRepository',
  ['login'],
);

describe('AuthUseCasesService', () => {
  let service: AuthUseCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthRepository, useValue: AuthRepositoryMock },
        AuthUseCasesService,
      ],
    });

    service = TestBed.inject(AuthUseCasesService);
  });

  afterEach(() => {
    AuthRepositoryMock.login.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login method of AuthRepository', async () => {
    AuthRepositoryMock.login.and.returnValue(
      Promise.resolve(new AuthUser('1', 'John Doe', 'john.doe@example.com')),
    );

    const credentials = { id: 'test', password: 'password' };
    await service.login(credentials);

    expect(AuthRepositoryMock.login).toHaveBeenCalledOnceWith(credentials);
  });
});
