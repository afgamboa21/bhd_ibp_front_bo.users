import { Component, Input } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  @Input() items: { label: string; routerLink?: any[] }[] = [];
  /* [
    { label: 'Usuarios banca en linea', routerLink: ['/users'] },
    { label: 'Administración de roles' },
  ] */
}
