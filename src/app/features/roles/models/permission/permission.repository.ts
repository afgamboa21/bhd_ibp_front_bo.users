import { IPermission } from './permission.model';

export abstract class PermissionRepository {
  abstract getAllPermissions(): Promise<IPermission[]>;
}
