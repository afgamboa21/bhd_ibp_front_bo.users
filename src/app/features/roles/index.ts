import { PermissionUseCaseService } from './application/permission-use-case.service';
import { PermissionRepository } from './models/permission/permission.repository';
import { PermissionService } from './infrastructure/permission-api.service';
import { RolesRepository } from './models/role/roles.repository';
import { RolesApiService } from './infrastructure/roles-api.service';
import { RoleUseCaseService } from './application/role-use-case.service';

const providerPermissionRepository = () => ({
  provide: PermissionRepository,
  useClass: PermissionService,
});

const providerRoleRepository = () => ({
  provide: RolesRepository,
  useClass: RolesApiService,
});

export const providePermissions = () => [
  providerPermissionRepository(),
  PermissionUseCaseService,
];
export const provideRoles = () => [
  providerRoleRepository(),
  RoleUseCaseService,
];
