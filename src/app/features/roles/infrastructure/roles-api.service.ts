import { inject, Injectable } from '@angular/core';
import { HttpService } from '@bhd/data-access';
import { RolesRepository } from '../models/roles.repository';
import { catchError, Observable, of } from 'rxjs';
import { PaginatedResponse, Role } from '../models/roles.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RolesApiService extends RolesRepository {
  constructor(private httpSvc: HttpService) {
    super();
  }

  private http = inject(HttpClient);

  // Add API service methods here
  // TODO implementar servicio desde el bk
  getRoles(page: number, size: number) {
    const mockData: Role[] = [
      {
        id: 1,
        code: '0812472',
        name: 'Administrador',
        description: 'Acceso total',
      },
      {
        id: 2,
        code: '0812170',
        name: 'Usuario',
        description: 'Acceso limitado',
      },
      {
        id: 3,
        code: '0812171',
        name: 'Supervisor',
        description: 'Supervisión de usuarios',
      },
      {
        id: 4,
        code: '0812172',
        name: 'Auditor',
        description: 'Acceso a auditorías',
      },
      {
        id: 5,
        code: '0812173',
        name: 'Gerente',
        description: 'Gestión de operaciones',
      },
      {
        id: 6,
        code: '0812174',
        name: 'Analista',
        description: 'Análisis de datos',
      },
      {
        id: 7,
        code: '0812175',
        name: 'Soporte',
        description: 'Soporte técnico',
      },
      {
        id: 8,
        code: '0812176',
        name: 'Consultor',
        description: 'Consultoría externa',
      },
      {
        id: 9,
        code: '0812177',
        name: 'Desarrollador',
        description: 'Desarrollo de software',
      },
      {
        id: 10,
        code: '0812178',
        name: 'Tester',
        description: 'Pruebas de calidad',
      },
      {
        id: 11,
        code: '0812179',
        name: 'Operador',
        description: 'Operaciones diarias',
      },
      {
        id: 12,
        code: '0812180',
        name: 'Especialista',
        description: 'Especialización técnica',
      },
      {
        id: 13,
        code: '0812181',
        name: 'Coordinador',
        description: 'Coordinación de equipos',
      },
      {
        id: 14,
        code: '0812182',
        name: 'Director',
        description: 'Dirección estratégica',
      },
      {
        id: 15,
        code: '0812183',
        name: 'Asistente',
        description: 'Asistencia administrativa',
      },
      {
        id: 16,
        code: '0812184',
        name: 'Capacitador',
        description: 'Capacitación de personal',
      },
      {
        id: 17,
        code: '0812185',
        name: 'Investigador',
        description: 'Investigación y desarrollo',
      },
      {
        id: 18,
        code: '0812186',
        name: 'Planificador',
        description: 'Planificación de proyectos',
      },
      {
        id: 19,
        code: '0812187',
        name: 'Administrador de red',
        description: 'Gestión de redes',
      },
      {
        id: 20,
        code: '0812188',
        name: 'Arquitecto',
        description: 'Diseño de sistemas',
      },
    ];

    const paginated: PaginatedResponse<Role> = {
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
