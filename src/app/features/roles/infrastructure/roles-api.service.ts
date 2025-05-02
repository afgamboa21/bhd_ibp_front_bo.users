import { inject, Injectable } from '@angular/core';
import { HttpService } from '@bhd/data-access';
import { RolesRepository } from '../models/role/roles.repository';
import { catchError, Observable, of } from 'rxjs';
import {
  IRole,
  IRoleResponse,
  PaginatedResponse,
} from '../models/role/roles.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RolesApiService {
  constructor(private http: HttpClient) {
    // super();
  }
  private readonly baseUrl = 'http://localhost:3000/roles';

  // Add API service methods here
  // TODO implementar servicio desde el bk
  async getAllRoles(page: number, size: number) {
    const mockData: IRoleResponse[] = [
      {
        id: 1,
        name: 'Administrador',
        description: 'Acceso total',
        permissions: [1, 2],
      },
      {
        id: 2,
        name: 'Usuario',
        description: 'Acceso limitado',
        permissions: [1],
      },
    ];

    const paginated: PaginatedResponse<IRoleResponse> = {
      data: mockData.slice((page - 1) * size, page * size),
      total: mockData.length,
      page,
      size,
    };

    return Promise.resolve(paginated);

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchRoles(query: string): Observable<any[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any[]>(
      `https://jsonplaceholder.typicode.com/users?name_like=${query}`,
    );
  }

  createRole(role: IRole) {
    localStorage.setItem('newRole', JSON.stringify(role));
    return this.http.post<IRole>(`${this.baseUrl}/create`, role);
  }

  updateRole(role: IRole) {
    return this.http.put<IRole>(`${this.baseUrl}/update/${role.id}`, role);
  }

  getRoleById(id: number): Promise<any> {
    // this.http.get<IRole>(`${this.baseUrl}/${id}`);
    const mockData: IRoleResponse = {
      id: 1,
      name: 'Administrador',
      description: 'Acceso total',
      permissions: [1, 2],
    };
    return Promise.resolve(mockData);
  }
}
