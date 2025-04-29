import { Injectable } from '@angular/core';
import { ApprovalSchemesRepository } from '../models/approvalSchemes.repository';
import { Scheme } from '../models/schemes';

@Injectable()
export class ApprovalSchemesUseCaseService {
  constructor(private readonly repository: ApprovalSchemesRepository) {}

  getSchemes():Promise<Scheme[]> {
    return this.repository.getSchemes();
  }

  // Add use case methods here
}
