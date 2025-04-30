import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';

import { InputLabelComponent } from '@/app/shared/components/forms/temporary/input-label/input-label.component';
import { PermissionUseCaseService } from '@/app/features/roles/application/permission-use-case.service';
import {
  IPermission,
  IPermissionChild,
} from '@/app/features/roles/models/permission/permission.model';
import { providePermissions } from '@/app/features/roles';
import { Permission } from '@/app/features/roles/infrastructure/permission';
import { DinamyToggleOrCheckBoxComponent } from '@/app/shared/components/forms/temporary/toggle-input/dinamyToggleOrCheckBox/dinamyToggleOrCheckBox.component';

@Component({
  selector: 'app-form-role-component',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputLabelComponent,
    DinamyToggleOrCheckBoxComponent,
  ],
  providers: [providePermissions()],
  templateUrl: './FormRole.component.html',
})
export class RoleComponent implements OnInit {
  constructor() {}

  private readonly FormRoleBuilder = inject(FormBuilder);
  private readonly permissionService = inject(PermissionUseCaseService);
  action = input.required<string>();
  isEditMode = signal(false);
  hasError = signal(false);
  isLoading = signal(false);
  roleId = input<number>();
  permissions = signal<IPermission[] | []>([]);
  permissionsChild = signal<IPermissionChild[] | []>([]);
  selectedPermissionsIds = signal<number[]>([]);

  permissionMethods!: Permission;

  myRoleForm: FormGroup = this.FormRoleBuilder.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    permissions: this.FormRoleBuilder.array<number>([], Validators.required),
  });

  isPermissionSelected = (perm: IPermissionChild) =>
    this.permissionMethods?.isPermissionSelected(perm);

  areAllPermissionsSelected(group: IPermission): boolean {
    return this.permissionMethods?.areAllPermissionsSelected(group);
  }
  handleToggleAll(group: IPermission, event: Event): void {
    this.permissionMethods?.handleToggleAll(group, event);
  }

  handlePermissionToggle = (perm: IPermissionChild, event: Event) =>
    this.permissionMethods?.handlePermissionToggle(perm, event);

  ngOnInit(): void {
    const permissionsArray = this.myRoleForm.get('permissions') as FormArray;
    this.permissionMethods = new Permission(permissionsArray);

    this.permissionService.getAllPermissions().then((permissions) => {
      this.permissions.set(permissions);
      this.permissionsChild.set(
        permissions.flatMap((permission) => permission.moduleResponse),
      );
    });
  }

  // handleAction(): void {
  //   if (this.action() === 'create') {
  //     this.permissionsByParent.set(this.permissionService.getPermissions());
  //   } else if (this.action() === 'edit' && this.roleId()) {
  //     this.isEditMode.set(true);
  //     this.isLoading.set(true);
  //     this.roleService.getRoleById(this.roleId()!).subscribe({
  //       next: (role) => {
  //         this.myRoleForm.patchValue({
  //           name: role.name,
  //           description: role.description,
  //         });

  //         role.permissions.forEach((permissionId) => {
  //           this.permissionsArray.push(
  //             this.FormRoleBuilder.control(permissionId),
  //           );
  //         });

  //         this.permissionsByParent.set(this.permissionService.getPermissions());
  //         this.isLoading.set(false);
  //       },
  //       error: () => {
  //         this.hasError.set(true);
  //         this.isLoading.set(false);
  //       },
  //     });
  //   }
  // }

  // onSave() {
  //   if (this.myRoleForm.valid) {
  //     console.log(this.myRoleForm.value);
  //     this.roleService.createRole(this.myRoleForm.value).subscribe({
  //       next: (newRole) => {
  //         localStorage.setItem('newRole', JSON.stringify(newRole));
  //       },
  //       error: () => {
  //         this.hasError.set(true);
  //         this.isLoading.set(false);
  //       },
  //     });
  //   } else {
  //     console.warn('Formulario inválido');
  //   }
  // }
}
