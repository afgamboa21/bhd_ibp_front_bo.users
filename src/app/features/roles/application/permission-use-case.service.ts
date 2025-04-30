import { Injectable } from '@angular/core';
import { IPermission } from '../models/permission/permission.model';
import { PermissionRepository } from '../models/permission/permission.repository';

@Injectable()
export class PermissionUseCaseService {
  constructor(private readonly repository: PermissionRepository) {}

  getAllPermissions(): Promise<IPermission[]> {
    return this.repository.getAllPermissions();
  }
}
