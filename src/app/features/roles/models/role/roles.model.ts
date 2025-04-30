import { IPermission } from "../permission/permission.model";

export interface Role {
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  permissions: IPermission[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
}
