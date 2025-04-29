import { ControlValueAccessor, FormControl } from '@angular/forms';
import { nullAs } from '@/app/core/types/types/model-to-form';

export class FormItemBaseComponent<T> implements ControlValueAccessor {
  ctrl = new FormControl<T>(nullAs<T>());

  protected onChange!: (value: T) => void;
  protected onTouched!: () => void;

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: T): void {
    this.ctrl.setValue(value);
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.ctrl.disable();
      return;
    }

    this.ctrl.enable();
  }
}
