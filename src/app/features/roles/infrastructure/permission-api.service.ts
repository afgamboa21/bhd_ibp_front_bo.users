import { Injectable } from '@angular/core';

import { PermissionRepository } from '../models/permission/permission.repository';
import {
  IPermission,
  IPermissionChild,
} from '../models/permission/permission.model';
import {
  PermissionResponseDto,
  PermissionResponseDtoSchema,
} from './dto/permission.dto';
import { HttpClient } from '@angular/common/http';
import { SchemaValidator } from '@/app/core/services/infrastructure/schema-validator';
import { permissionDtoMapper } from './mappers/permission.dto.mapper';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService extends PermissionRepository {
  constructor(private readonly http: HttpClient) {
    super();
  }

  private apiUrl = 'http://localhost:5000/api/sections/all';

  async getAllPermissions(): Promise<IPermission[]> {

    const permisosMock: IPermission[] = [
      {
        id: 1,
        name: 'Transacciones',
        moduleResponse: [
          {
            id: 2,
            name: 'Tranferencias BHIDB',
            route: 'Transacciones',
            requires_Aprovals: true,
          },
          {
            id: 1,
            name: 'Transferencias internacionales',
            route: 'Transacciones',
            requires_Aprovals: true,
          },
        ],
      },
    ];
    const dto = await this.http.post<PermissionResponseDto>(this.apiUrl, "").toPromise();
    SchemaValidator.validate(PermissionResponseDtoSchema, dto);

    return permissionDtoMapper(dto);
  }
}
