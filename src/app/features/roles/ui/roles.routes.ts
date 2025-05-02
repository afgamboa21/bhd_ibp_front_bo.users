import { Routes } from '@angular/router';
import { urlPaths } from '@/app/shared/const/url-paths';

export const rolesRoutes: Routes = [
  {
    path: urlPaths.roles,
    loadComponent: () =>
      import('@/app/features/roles/ui/pages/role-page/role-page.component').then(
        (m) => m.RolePageComponent,
      ),
  },
];
