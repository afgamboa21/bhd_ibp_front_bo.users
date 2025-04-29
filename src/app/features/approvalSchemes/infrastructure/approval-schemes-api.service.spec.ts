import { TestBed } from '@angular/core/testing';

import { ApprovalSchemesApiService } from './approval-schemes-api.service';

describe('ApprovalSchemesApiService', () => {
  let service: ApprovalSchemesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalSchemesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
