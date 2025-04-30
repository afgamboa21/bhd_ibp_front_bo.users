import { Routes } from '@angular/router';
import { urlPaths } from './shared/const/url-paths';
import { authRoutes } from './features/auth/ui/auth.routes';
import { RolePageComponent } from './features/roles/ui/pages/role-page/role-page.component';

export const routes: Routes = [
  {
    path: 'roles',
    component: RolePageComponent,
  },
  {
    path: '',
    redirectTo: urlPaths.login,
    pathMatch: 'full',
  },
  ...authRoutes,
  {
    path: '**',
    redirectTo: urlPaths.login,
  },
];
