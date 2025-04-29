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
import { Role } from '../../../models/roles.model';
import { AuthApiService } from '@/app/features/auth/infrastructure/auth-api.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-role-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './role-page.component.html',
})
export class RolePageComponent {
  private readonly authService = inject(AuthApiService);
  private readonly roleService = inject(RolesApiService);

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
  roles = signal<Role[]>([]);
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
        this.roleService.searchRoles(q).subscribe({
          next: (results) => this.searchResults.set(results),
          complete: () => this.isLoading.set(false),
        });
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

    this.roleService.getRoles(this.currentPage(), this.pageSize()).subscribe({
      next: (res) => {
        this.roles.set(res.data);
        this.totalRoles.set(res.total);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
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
  openModal() {
    this.showModal.set(true);
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
}
