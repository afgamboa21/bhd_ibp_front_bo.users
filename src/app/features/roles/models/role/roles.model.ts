import { IPermission } from "../permission/permission.model";


export interface IRole {
  id?: number;
  name: string;
  description: string;
  permissions: IPermission[];
}

export interface IRoleResponse {
  id: number;
  name: string;
  description: string;
  permissions: number[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
}
