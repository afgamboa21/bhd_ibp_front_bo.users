import { Injectable } from '@angular/core';
// import { HttpService } from '@bhd/data-access';
import { ApprovalSchemesRepository } from '../models/approvalSchemes.repository';
import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
import { Scheme } from '../models/schemes';
import { SchemesResponseDto, SchemesResponseDtoSchema } from './dtos/schemes.dto';
import { SchemaValidator } from '@/app/core/services/infrastructure/schema-validator';
import { approvalSchemesDtoMapper } from './mappers/approvalSchemes-dto.mapper';

@Injectable()
export class ApprovalSchemesApiService extends ApprovalSchemesRepository {
  // constructor(private httpSvc: HttpService) {
  //   super();
  // }

  // Add API service methods here
  private apiUrl = 'https://run.mocky.io/v3/8eb5cfdd-f71b-4e2e-b07e-e8b3d48e7f8c';

  constructor(private http: HttpClient) {
    super();
  }

  async getSchemes(): Promise<Scheme[]> {
    const dto = await this.http.get<SchemesResponseDto>(this.apiUrl).toPromise();

    SchemaValidator.validate(SchemesResponseDtoSchema, dto);
    if (!dto) {
      throw new Error('Failed to fetch schemes: DTO is undefined');
    }
    return approvalSchemesDtoMapper(dto);
  }
}
