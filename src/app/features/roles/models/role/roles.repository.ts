import { IRole, IRoleResponse } from './roles.model';

export abstract class RolesRepository {
  abstract getAllRoles(): Promise<IRole[]>;
  abstract getRoleById(id: number): Promise<IRoleResponse>;
  abstract createRole(role: IRole): Promise<IRole>;
  abstract updateRole(id: number, role: IRole): Promise<IRole>;
}
