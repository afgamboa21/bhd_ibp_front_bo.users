import { Injectable } from '@angular/core';
import { RolesRepository } from '../models/role/roles.repository';
import { IRole } from '../models/role/roles.model';

@Injectable({
  providedIn: 'root',
})
export class RoleUseCaseService {
  constructor(private readonly repository: RolesRepository) {}

  getAllRoles(page: number, size: number): Promise<IRole[]> {
    return this.repository.getAllRoles(page, size);
  }

  searchRoles(query: string): Promise<IRole[]> {
    return this.repository.searchRoles(query);
  }

  getRoleById(id: number): Promise<IRole> {
    return this.repository.getRoleById(id);
  }

  createRole(role: IRole): Promise<IRole> {
    return this.repository.createRole(role);
  }

  updateRole(id: number, role: IRole): Promise<IRole> {
    return this.repository.updateRole(id, role);
  }
}
