import {
  Component,
  computed,
  effect,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { RolesApiService } from '../../../infrastructure/roles-api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { IRole, IRoleResponse } from '../../../models/role/roles.model';
import { AuthApiService } from '@/app/features/auth/infrastructure/auth-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { IconComponent } from '@/app/shared/components/icons/icon.component';
import { ButtonComponent } from '@/app/shared/components/forms/button.component';
import { InputTextComponent } from "@/app/shared/components/forms/input-text.component";
import { BreadcrumbComponent } from '@/app/shared/components/utils/breadcrumb/breadcrumb.component';
import { TableCustomComponent } from '@/app/shared/components/data/table-custom/table-custom.component';
import { RoleComponent } from '@/app/features/roles/ui/components/role/form-role/FormRole.component';
import { RoleUseCaseService } from '@/app/features/roles/application/role-use-case.service';
import { provideRoles } from '@/app/features/roles';

@Component({
  selector: 'app-role-page',
  imports: [CommonModule, ReactiveFormsModule, IconComponent, ButtonComponent, InputTextComponent, InputTextComponent, BreadcrumbComponent, TableCustomComponent, RoleComponent],
  providers: [provideRoles()],
  templateUrl: './role-page.component.html',
})
export class RolePageComponent {
  private readonly authService = inject(AuthApiService);
  // private readonly roleService = inject(RolesApiService);
  private readonly roleService = inject(RoleUseCaseService);

  itemsRolePage = [
    { label: 'Usuarios banca en línea', routerLink: ['/users'] },
    { label: 'Administración de roles' }
  ];

  query = signal('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchResults: WritableSignal<any[]> = signal([]);
  searchControl = new FormControl('', { nonNullable: true });
  searchControlSignal = toSignal(this.searchControl.valueChanges, {
    initialValue: '',
  });

  // Signals para estado de autenticación
  isAuthenticated = signal(this.authService.isAuthenticated());
  canAccess = computed(() => this.isAuthenticated());

  showModal = signal(false);
  idRoleSelected = signal<number>(0);
  actionModal = signal<'create' | 'edit'>('create');
  roles = signal<IRoleResponse[]>([]);
  isLoading = signal(false);
  hasError = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalRoles = signal(0);

  constructor() {
    this.fetchRoles();
    effect(() => {
      const q = this.query();
      if (q) {
        this.isLoading.set(true);
        this.roleService.searchRoles(q).then((res) => {
          this.searchResults.set(res);
        })
        /* this.roleService.searchRoles(q).subscribe({
          next: (results) => this.searchResults.set(results),
          complete: () => this.isLoading.set(false),
        }); */
      } else {
        this.searchResults.set([]);
      }
    });
  }

  /**
   * * Método para obtener los roles
   * @description Este método se encarga de obtener los roles
   * desde la API y actualizar la lista de roles en la vista.
   * Se utiliza un debounce para evitar múltiples llamadas a la API
   * mientras el usuario escribe.
   * @returns Observable<Role[]>
   */
  fetchRoles() {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.roleService.getAllRoles(this.currentPage(), this.pageSize()).then((res) => {
      console.log('res', res)
      this.roles.set(res.data);
      this.isLoading.set(false);
    });

    /* this.roleService.getAllRoles(this.currentPage(), this.pageSize()).subscribe({
      next: (res) => {
        this.roles.set(res.data);
        this.totalRoles.set(res.total);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    }); */
  }

  /**
   * * Método para ir a la página anterior
   * @description Este método se encarga de ir a la página anterior
   * y actualizar la lista de roles.
   */
  prevPage() {
    this.currentPage.update((p) => Math.max(1, p - 1));
    this.fetchRoles();
  }

  /**
   * * Método para ir a la página siguiente
   */
  nextPage() {
    this.currentPage.update((p) => p + 1);
    this.fetchRoles();
  }

  /**
   * * Método para buscar roles por codigo, nombre o descripción
   * @param query - Cadena de búsqueda
   * @returns Observable<Role[]>
   * @description Este método se encarga de buscar roles en la API
   * y actualizar la lista de roles en la vista. Se utiliza un debounce
   * para evitar múltiples llamadas a la API mientras el usuario escribe.
   */
  onSearchEnter() {
    const query = this.searchControl.value.trim();
    if (!query) {
      this.searchControl.setErrors({ required: true });
      return;
    }
    this.query.set(query);
  }

  /**
   * * Método para abrir el modal de creación de roles
   * @description Este método se encarga de abrir el modal de creación
   */
  openModal(isCreate: boolean = true) {
    this.showModal.set(true);
    this.actionModal.set(isCreate ? 'create' : 'edit');
  }

  /**
   * * Método para cerrar el modal de creación de roles
   * @description Este método se encarga de cerrar el modal de creación
   */
  closeModal() {
    this.showModal.set(false);
  }

  /**
   * * Método para limpiar el campo de búsqueda
   * @description Este método se encarga de limpiar el campo de búsqueda
   * y la lista de resultados.
   */
  clearSearch() {
    this.searchControl.setValue('');
    this.searchResults.set([]);
  }

  /**
   * * Método para obtener el número total de páginas
   * @description Este método se encarga de obtener el número total
   * de páginas a partir del número total de roles y el tamaño de página.
   * @returns number
   */
  get totalPages(): number {
    return Math.ceil(this.totalRoles() / this.pageSize());
  }

  /**
   * * Método para obtener un array con el número de páginas
   * @description Este método se encarga de obtener un array con el número
   * total de páginas a partir del número total de roles y el tamaño de página.
   * @returns number[]
   */
  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  /**
   * * * Método para cambiar de página
   * @description Este método se encarga de cambiar de página y
   * actualizar la lista de roles.
   * @param event
   * @returns void
   */
  onPageChange(event: Event): void {
    const selectedPage = +(event.target as HTMLSelectElement).value;
    this.currentPage.set(selectedPage);
    console.log('Página seleccionada:', selectedPage);
  }

  /**
   * * Método para ver detalles de un rol
   * @description Este método se encarga de mostrar los detalles de un rol.
   * @param roleId - ID del rol
   */
  onViewDetails(roleId: number): void {
    console.log('View details for role:', roleId);
  }

  /**
   * * Método para editar un rol
   * @description Este método se encarga de editar un rol.
   * @param roleId - ID del rol
   */
  onEditRole(roleId: number): void {
    console.log('Edit role:', roleId);
    this.idRoleSelected.set(roleId);
    this.openModal(false)
  }

  /**
   * * Método para eliminar un rol
   * @description Este método se encarga de eliminar un rol.
   * @param roleId - ID del rol
   */
  onDeleteRole(roleId: number): void {
    console.log('Delete role:', roleId);
  }
}
