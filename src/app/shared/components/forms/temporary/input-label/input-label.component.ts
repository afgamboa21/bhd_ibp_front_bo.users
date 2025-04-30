import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FormItemBaseComponent } from '../../form-item-base-component';

@Component({
  selector: 'app-input-label',
  imports: [ReactiveFormsModule],
  templateUrl: './input-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputLabelComponent),
      multi: true,
    },
  ],
})
export class InputLabelComponent extends FormItemBaseComponent<string> {
  label = input<string>(' ');
  formControlName = input<string>(' ');
  placeholder = input<string>(' ');
  formGroup = input.required<FormGroup>();
  value = input<string>(' ');
  valueChange = output<KeyboardEvent>();

  inputChange($event: KeyboardEvent) {
    const value = ($event.target as HTMLInputElement).value;
    this.ctrl.setValue(value);
    this.onChange?.(value);
    this.valueChange.emit($event);
  }
}
