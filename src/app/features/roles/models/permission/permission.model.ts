export interface IPermission {
  id: number;
  name: string;
  moduleResponse: IPermissionChild[];
}

export interface IPermissionChild {
  id: number;
  name: string;
  route: string;
  requires_Aprovals: boolean;
}
