 import { Routes } from '@angular/router';
//  import { urlPaths } from '@/app/shared/const/url-paths';

 export const approvalSchemesRoutes: Routes = [
   {
     path: 'approvalSchemes',
     loadComponent: () =>
       import('@/app/features/approvalSchemes/ui/pages/approvalSchemes.page').then(
         (m) => m.ApprovalSchemesPage,
       ),
   },
 ];
