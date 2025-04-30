import { PermissionUseCaseService } from './application/permission-use-case.service';
import { PermissionRepository } from './models/permission/permission.repository';
import { PermissionService } from './infrastructure/permission-api.service';

const providerRepository = () => ({
  provide: PermissionRepository,
  useClass: PermissionService,
});

export const providePermissions = () => [providerRepository(), PermissionUseCaseService];
