import { inject, Injectable } from '@angular/core';
import { HttpService } from '@bhd/data-access';
import { RolesRepository } from '../models/role/roles.repository';
import { catchError, Observable, of } from 'rxjs';
import { PaginatedResponse, IRole } from '../models/role/roles.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RolesApiService extends RolesRepository {
  override async getAllRoles(): Promise<IRole[]> {
    try {
      const response = await this.http
        .get<IRole[]>('https://jsonplaceholder.typicode.com/users')
        .toPromise();
      return response || [];
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }
  override getRoleById(id: number): Promise<IRole> {
    throw new Error('Method not implemented.');
  }
  override createRole(role: IRole): Promise<IRole> {
    throw new Error('Method not implemented.');
  }
  override updateRole(id: number, role: IRole): Promise<IRole> {
    throw new Error('Method not implemented.');
  }
  constructor(private httpSvc: HttpService) {
    super();
  }

  private http = inject(HttpClient);

  // Add API service methods here
  // TODO implementar servicio desde el bk
  getRoles(page: number, size: number) {
    const mockData: IRole[] = [
      {
        id: 8125,
        name: 'Administrador',
        description: 'Acceso total',
      },
      {
        id: 8125,
        name: 'Usuario',
        description: 'Acceso limitado',
      },
      {
        id: 8125,
        name: 'Supervisor',
        description: 'Supervisión de usuarios',
      },
      {
        id: 8125,
        name: 'Auditor',
        description: 'Acceso a auditorías',
      },
      {
        id: 8125,
        name: 'Gerente',
        description: 'Gestión de operaciones',
      },
      {
        id: 8125,
        name: 'Analista',
        description: 'Análisis de datos',
      },
      {
        id: 8125,
        name: 'Soporte',
        description: 'Soporte técnico',
      },
      {
        id: 8125,
        name: 'Consultor',
        description: 'Consultoría externa',
      },
      {
        id: 8125,
        name: 'Desarrollador',
        description: 'Desarrollo de software',
      },
      {
        id: 8125,
        name: 'Tester',
        description: 'Pruebas de calidad',
      },
      {
        id: 8125,
        name: 'Operador',
        description: 'Operaciones diarias',
      },
      {
        id: 8125,
        name: 'Especialista',
        description: 'Especialización técnica',
      },
      {
        id: 8125,
        name: 'Coordinador',
        description: 'Coordinación de equipos',
      },
      {
        id: 8125,
        name: 'Director',
        description: 'Dirección estratégica',
      },
      {
        id: 8125,
        name: 'Asistente',
        description: 'Asistencia administrativa',
      },
      {
        id: 8125,
        name: 'Capacitador',
        description: 'Capacitación de personal',
      },
      {
        id: 8125,
        name: 'Investigador',
        description: 'Investigación y desarrollo',
      },
      {
        id: 8125,
        name: 'Planificador',
        description: 'Planificación de proyectos',
      },
      {
        id: 8125,
        name: 'Administrador de red',
        description: 'Gestión de redes',
      },
      {
        id: 8125,
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
}
