import { Routes } from '@angular/router';
import { urlPaths } from './shared/const/url-paths';
// import { authRoutes } from './features/auth/ui/auth.routes';
import { rolesRoutes } from './features/roles/ui/roles.routes';
import { approvalSchemesRoutes } from './features/approvalSchemes/ui/approvalSchemes.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: urlPaths.approvalSchemes,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: urlPaths.roles,
    pathMatch: 'full',
  },
  // ...authRoutes,
  ...approvalSchemesRoutes,
  ...rolesRoutes,
  {
    path: '**',
    redirectTo: urlPaths.approvalSchemes,
  },
];
