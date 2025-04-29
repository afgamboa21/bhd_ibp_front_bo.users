export interface Role {
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
}
