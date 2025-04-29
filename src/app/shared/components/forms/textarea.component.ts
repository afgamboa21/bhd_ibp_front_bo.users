import { Component, forwardRef, input, output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { FormItemBaseComponent } from './form-item-base-component';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [ReactiveFormsModule, TextareaModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  template: ` <div class="input-wrapper">
    <label [for]="fieldId()">
      {{ label() }}
    </label>

    <textarea
      pTextarea
      class="transition-colors"
      [formControl]="ctrl"
      [placeholder]="placeholder()"
      [attr.aria-describedby]="ariaDescribedBy()"
      [id]="fieldId()"
      [readonly]="readonly()"
      [maxlength]="maxLength()"
      [minlength]="minLength()"
      [rows]="rows()"
      [cols]="cols()"
      (blur)="onBlur()"
      (focus)="onFocus()"
      (keyup)="inputChange($event)"></textarea>
  </div>`,
  styles: [
    `
      :host {
        display: block;
      }

      textarea {
        resize: none;
        border: 1.5px solid var(--stroke-action-box-and-line);
        padding: 12px 1rem;
      }

      textarea:hover {
        border-color: var(--stroke-action-hover);
      }
    `,
  ],
})
export class TextareaComponent extends FormItemBaseComponent<string> {
  label = input.required<string>();
  fieldId = input<string>();
  placeholder = input<string>('');
  ariaDescribedBy = input<string>();
  disabled = input<boolean>(false);
  preventCopyPaste = input<boolean>(false);
  readonly = input<boolean>(false);
  maxLength = input<string | null>(null);
  minLength = input<string | null>(null);
  rows = input<number>(3);
  cols = input<number>(30);

  blurred = output<void>();
  focused = output<void>();
  valueChange = output<KeyboardEvent>();

  onBlur() {
    this.onTouched?.();
    this.blurred.emit();
  }

  onFocus() {
    this.onTouched?.();
    this.focused.emit();
  }

  inputChange($event: KeyboardEvent) {
    const value = ($event.target as HTMLTextAreaElement).value;
    this.ctrl.setValue(value);
    this.onChange?.(value);
    this.valueChange.emit($event);
  }
}
