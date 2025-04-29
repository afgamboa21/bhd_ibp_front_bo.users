import { Routes } from '@angular/router';
import { urlPaths } from './shared/const/url-paths';
// import { authRoutes } from './features/auth/ui/auth.routes';
import { approvalSchemesRoutes } from './features/approvalSchemes/ui/approvalSchemes.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: urlPaths.login,
    pathMatch: 'full',
  },
  // ...authRoutes,
  ...approvalSchemesRoutes,
  {
    path: '**',
    redirectTo: urlPaths.login,
  },
];
