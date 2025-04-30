import { FormArray, FormControl } from '@angular/forms';
import { IPermission, IPermissionChild } from '../models/permission/permission.model';

export class Permission {
  constructor(private permissionsFormArray: FormArray) {}

  registerPermissionsArray(formArray: FormArray) {
    this.permissionsFormArray = formArray;
  }
  isPermissionSelected(permission: IPermissionChild): boolean {
    return this.permissionsFormArray.value.includes(permission.id);
  }

  areAllPermissionsSelected(group: IPermission): boolean {
    console.log("hola",group);
    return group.moduleResponse.every((perm) =>
      this.isPermissionSelected(perm),
    );
  }

  handleToggleAll(grupo: IPermission, event: Event): void {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    grupo.moduleResponse.forEach((permiso) => {
      const exists = this.permissionsFormArray.controls.some(
        (ctrl) => ctrl.value === permiso.id,
      );

      if (checked && !exists) {
        this.permissionsFormArray.push(new FormControl(permiso.id));
      } else if (!checked && exists) {
        const index = this.permissionsFormArray.controls.findIndex(
          (ctrl) => ctrl.value === permiso.id,
        );
        this.permissionsFormArray.removeAt(index);
      }
    });
  }

  handlePermissionToggle(permiso: IPermissionChild, event: Event): void {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    const exists = this.permissionsFormArray.controls.some(
      (ctrl) => ctrl.value === permiso.id,
    );

    if (checked && !exists) {
      this.permissionsFormArray.push(new FormControl(permiso.id));
    } else if (!checked && exists) {
      const index = this.permissionsFormArray.controls.findIndex(
        (ctrl) => ctrl.value === permiso.id,
      );
      this.permissionsFormArray.removeAt(index);
    }
  }
}
