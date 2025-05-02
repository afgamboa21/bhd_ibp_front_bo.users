import { RolesRepository } from './models/role/roles.repository';
import { RolesApiService } from './infrastructure/roles-api.service';

const providerRepository = () => ({
  provide: RolesRepository,
  useClass: RolesApiService,
});

export const provideRoles = () => [providerRepository()];
