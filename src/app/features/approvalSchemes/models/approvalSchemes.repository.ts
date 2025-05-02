import { Scheme } from "./schemes";

export abstract class ApprovalSchemesRepository {
  // Define abstract methods for the approvalSchemes repository contract
  abstract getSchemes(): Promise<Scheme[]>;
}
