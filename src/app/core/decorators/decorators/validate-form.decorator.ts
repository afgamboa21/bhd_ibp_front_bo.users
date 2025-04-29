import { FormGroup } from '@angular/forms';
import { SafeAny } from '../../types/types/safe-any';

export function ValidateForm(propertyName: string) {
  return (
    target: SafeAny,
    methodName: string,
    descriptor: PropertyDescriptor,
  ) => {
    const method = descriptor.value;
    descriptor.value = function (...args: SafeAny[]) {
      const form = (this as Record<string, FormGroup>)[propertyName];

      for (const key in form.controls) {
        if (form.controls[key].invalid) {
          form.controls[key].markAsDirty();
        }
      }

      if (form?.status === 'INVALID') {
        form.markAllAsTouched();
        form.markAsDirty();
        form.updateValueAndValidity({ emitEvent: false });
        return;
      }

      return method.apply(this, args);
    };
  };
}
