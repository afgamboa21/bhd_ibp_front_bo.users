import { ApprovalSchemesRepository } from './models/approvalSchemes.repository';
import { ApprovalSchemesApiService } from './infrastructure/approvalSchemes-api.service';
import { ApprovalSchemesUseCaseService } from './application/approvalSchemes-use-case.service';

const providerRepository = () => ({
  provide: ApprovalSchemesRepository,
  useClass: ApprovalSchemesApiService,
});

export const provideApprovalSchemes = () => [
  providerRepository(),
  ApprovalSchemesUseCaseService,
];
