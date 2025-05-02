import { TestBed } from '@angular/core/testing';

import { ApprovalSchemesUseCaseService } from './approval-schemes-use-case.service';

describe('ApprovalSchemesUseCaseService', () => {
  let service: ApprovalSchemesUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalSchemesUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
