import { inject, Injectable } from '@angular/core';
import { HttpService } from '@bhd/data-access';
import { RolesRepository } from '../models/role/roles.repository';
import { catchError, Observable, of } from 'rxjs';
import { PaginatedResponse, IRole } from '../models/role/roles.model';
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
  getRoles(page: number, size: number) {
    const mockData: IRole[] = [
      {
        id: 1,
        name: 'Administrador',
        description: 'Acceso total',
      },
      {
        id: 2,
        name: 'Usuario',
        description: 'Acceso limitado',
      },
      {
        id: 3,
        name: 'Supervisor',
        description: 'Supervisión de usuarios',
      },
      {
        id: 4,
        name: 'Auditor',
        description: 'Acceso a auditorías',
      },
      {
        id: 5,
        name: 'Gerente',
        description: 'Gestión de operaciones',
      },
      {
        id: 6,
        name: 'Analista',
        description: 'Análisis de datos',
      },
      {
        id: 7,
        name: 'Soporte',
        description: 'Soporte técnico',
      },
      {
        id: 8,
        name: 'Consultor',
        description: 'Consultoría externa',
      },
      {
        id: 9,
        name: 'Desarrollador',
        description: 'Desarrollo de software',
      },
      {
        id: 10,
        name: 'Tester',
        description: 'Pruebas de calidad',
      },
      {
        id: 11,
        name: 'Operador',
        description: 'Operaciones diarias',
      },
      {
        id: 12,
        name: 'Especialista',
        description: 'Especialización técnica',
      },
      {
        id: 13,
        name: 'Coordinador',
        description: 'Coordinación de equipos',
      },
      {
        id: 14,
        name: 'Director',
        description: 'Dirección estratégica',
      },
      {
        id: 15,
        name: 'Asistente',
        description: 'Asistencia administrativa',
      },
      {
        id: 16,
        name: 'Capacitador',
        description: 'Capacitación de personal',
      },
      {
        id: 17,
        name: 'Investigador',
        description: 'Investigación y desarrollo',
      },
      {
        id: 18,
        name: 'Planificador',
        description: 'Planificación de proyectos',
      },
      {
        id: 19,
        name: 'Administrador de red',
        description: 'Gestión de redes',
      },
      {
        id: 20,
        name: 'Arquitecto',
        description: 'Diseño de sistemas',
      },
    ];

    const paginated: PaginatedResponse<IRole> = {
      data: mockData.slice((page - 1) * size, page * size),
      total: mockData.length,
      page,
      size,
    };

    return of(paginated).pipe(
      catchError((error) => {
        console.error('Error al consultar roles', error);
        throw error;
      }),
    );
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

  getRoleById(id: number): Promise<IRole> {
    // return this.http.get<IRole>(`${this.baseUrl}/${id}`);
    const mockData: IRole = {
      id: 1,
      name: 'Administrador',
      description: 'Acceso total',
      // permissions: [1, 2],
    };
    return Promise.resolve(mockData);
  }
}
