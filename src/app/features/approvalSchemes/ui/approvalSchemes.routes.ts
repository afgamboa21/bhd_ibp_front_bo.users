 import { Routes } from '@angular/router';
 import { urlPaths } from '@/app/shared/const/url-paths';

 export const approvalSchemesRoutes: Routes = [
   {
     path: urlPaths.approvalSchemes,
     loadComponent: () =>
       import('@/app/features/approvalSchemes/ui/pages/approval-schemes.page').then(
         (m) => m.ApprovalSchemesPage,
       ),
   },
 ];
