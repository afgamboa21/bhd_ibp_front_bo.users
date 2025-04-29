import { Routes } from '@angular/router';
import { urlPaths } from '@/app/shared/const/url-paths';

export const authRoutes: Routes = [
  {
    path: urlPaths.login,
    loadComponent: () =>
      import('@/app/features/auth/ui/pages/login.page').then(
        (m) => m.LoginPage,
      ),
  },
];
