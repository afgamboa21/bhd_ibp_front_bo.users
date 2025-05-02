import { Injectable } from '@angular/core';
import { IRole } from './roles.model';

@Injectable({
  providedIn: 'root', // This makes it globally available
})
export abstract class RolesRepository {
  abstract getAllRoles(page: number, size: number): Promise<IRole[]>;
  abstract searchRoles(query: string): Promise<IRole[]>;
  abstract getRoleById(id: number): Promise<IRole>;
  abstract createRole(role: IRole): Promise<IRole>;
  abstract updateRole(id: number, role: IRole): Promise<IRole>;
}
