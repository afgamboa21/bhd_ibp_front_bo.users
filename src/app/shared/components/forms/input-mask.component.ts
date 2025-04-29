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
import { InputMaskModule } from 'primeng/inputmask';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormItemBaseComponent } from './form-item-base-component';

@Component({
  selector: 'app-input-mask',
  imports: [ReactiveFormsModule, InputMaskModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true,
    },
  ],
  template: ` <div class="input-wrapper">
    <div
      class="absolute bottom-0 grid place-items-center h-[3.5rem] w-[3rem] left-0 pointer-events-none z-10"
      #iconStart>
      <ng-content select="[icon-start]" />
    </div>

    <label [for]="fieldId()">
      {{ label() }}
    </label>

    <p-inputMask
      [unmask]="true"
      class="transition-colors"
      styleClass="w-full {{ hasIconStart() && 'icon--left' }} {{
        hasIconEnd() && 'icon--right'
      }}"
      [formControl]="ctrl"
      [placeholder]="placeholder()"
      [attr.aria-describedby]="ariaDescribedBy()"
      [inputId]="fieldId()"
      (onBlur)="onBlur()"
      (onFocus)="onFocus()"
      [mask]="mask()"
      [autocomplete]="autocomplete()"></p-inputMask>

    <div
      class="absolute bottom-0 grid place-items-center h-[3.5rem] w-[3rem] right-0 z-10"
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
export class InputMaskComponent extends FormItemBaseComponent<string> {
  private destroy$ = new Subject<void>();

  fieldId = input<string>();
  label = input.required<string>();
  placeholder = input<string>();
  ariaDescribedBy = input<string>();
  disabled = input<boolean>(false);
  autocomplete = input<'off' | 'on'>('off');
  mask = input.required<string>();

  blurred = output<void>();
  focused = output<void>();
  valueChange = output<string | null>();

  iconStart = viewChild<ElementRef>('iconStart');
  hasIconStart = computed(
    () => this.iconStart()?.nativeElement.children.length > 0,
  );
  iconEnd = viewChild<ElementRef>('iconEnd');
  hasIconEnd = computed(
    () => this.iconEnd()?.nativeElement.children.length > 0,
  );

  constructor() {
    super();
    this.ctrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.onChange?.(value || '');
      this.valueChange.emit(value);
    });
  }

  onBlur() {
    this.onTouched?.();
    this.blurred.emit();
  }

  onFocus() {
    this.onTouched?.();
    this.focused.emit();
  }
}
