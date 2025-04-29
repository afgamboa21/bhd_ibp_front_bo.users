import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FormItemBaseComponent } from './form-item-base-component';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
  template: ` <div class="input-wrapper">
    <div
      class="absolute bottom-0 grid place-items-center h-[3.5rem] w-[3rem] left-0 pointer-events-none"
      #iconStart>
      <ng-content select="[icon-start]" />
    </div>

    <label [for]="fieldId()">
      {{ label() }}
    </label>

    <input
      [ngClass]="{
        'icon--left': hasIconStart(),
        'icon--right': hasIconEnd(),
      }"
      class="transition-colors"
      [formControl]="ctrl"
      [placeholder]="placeholder()"
      [type]="fieldType()"
      [attr.aria-describedby]="ariaDescribedBy()"
      [id]="fieldId()"
      [autocomplete]="autocomplete()"
      [readonly]="readonly()"
      [maxlength]="maxLength()"
      [minlength]="minLength()"
      (blur)="onBlur()"
      (focus)="onFocus()"
      (keyup)="inputChange($event)"
      pInputText />
    <div
      class="absolute bottom-0 grid place-items-center h-[3.5rem] w-[3rem] right-0"
      #iconEnd>
      <ng-content select="[icon-end]" />
    </div>
  </div>`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class InputTextComponent extends FormItemBaseComponent<string> {
  fieldId = input<string>();
  label = input.required<string>();
  fieldType = input<'text' | 'email' | 'password'>('text');
  placeholder = input<string>();
  ariaDescribedBy = input<string>();
  disabled = input<boolean>(false);
  autocomplete = input<'off' | 'on'>('off');
  preventCopyPaste = input<boolean>(false);
  readonly = input<boolean>(false);
  maxLength = input<string | null>(null);
  minLength = input<string | null>(null);

  blurred = output<void>();
  focused = output<void>();
  valueChange = output<KeyboardEvent>();

  iconStart = viewChild<ElementRef>('iconStart');
  hasIconStart = computed(
    () => this.iconStart()?.nativeElement.children.length > 0,
  );
  iconEnd = viewChild<ElementRef>('iconEnd');
  hasIconEnd = computed(
    () => this.iconEnd()?.nativeElement.children.length > 0,
  );

  onBlur() {
    this.onTouched?.();
    this.blurred.emit();
  }

  onFocus() {
    this.onTouched?.();
    this.focused.emit();
  }

  inputChange($event: KeyboardEvent) {
    const value = ($event.target as HTMLInputElement).value;
    this.ctrl.setValue(value);
    this.onChange?.(value);
    this.valueChange.emit($event);
  }
}
