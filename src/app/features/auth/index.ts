import { AuthUseCasesService } from './application/auth-use-cases.service';
import { AuthRepository } from './models/auth.repository';
import { AuthApiService } from './infrastructure/auth-api.service';

const providerRepository = () => ({
  provide: AuthRepository,
  useClass: AuthApiService,
});

export const provideAuth = () => [providerRepository(), AuthUseCasesService];
