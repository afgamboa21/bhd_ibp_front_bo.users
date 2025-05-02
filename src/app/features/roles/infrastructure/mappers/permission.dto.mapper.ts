import {
  IPermission,
  IPermissionChild,
} from '../../models/permission/permission.model';

export const permissionDtoMapper = (dto: any): IPermission[] => {
  return dto.map((permission: any) => {
    return {
      id: permission.id,
      name: permission.name,
      moduleResponse: permission.moduleResponse.map(
        (child: IPermissionChild) => ({
          id: child.id,
          name: child.name,
          route: child.route,
          requires_Aprovals: child.requires_Aprovals,
        }),
      ),
    };
  });
};
