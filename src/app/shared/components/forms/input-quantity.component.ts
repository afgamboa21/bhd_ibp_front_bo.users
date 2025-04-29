import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../icons/icon.component';
import { FormatMoneyPipe } from '../../pipes/format-money.pipe';
import { FormItemBaseComponent } from './form-item-base-component';

@Component({
  selector: 'app-input-quantity',
  imports: [ReactiveFormsModule, IconComponent, FormatMoneyPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputQuantityComponent),
      multi: true,
    },
  ],
  template: `
    <div class="input-wrapper {{ styleClass() }}">
      @if (label()) {
        <label [for]="fieldId()">
          {{ label() }}
        </label>
      }
      <div
        class="input-quantity relative h-[3.5rem] min-w-[160px] grid grid-cols-[56px_minmax(48px,1fr)_56px] overflow-hidden items-center border-[1.5px] border-solid rounded-md ">
        <button type="button" class="h-full w-[56px]" (click)="onMinus()">
          <app-icon name="minus" [strokeWidth]="2" />
        </button>
        <div class="relative h-full w-full">
          <span
            class="flex items-center justify-center h-full w-full text-center pointer-events-none border-none absolute top-0 left-0">
            {{ ctrl.value | formatMoney: false }}
          </span>
          <input
            class="h-full w-full text-center pointer-events-none border-none text-transparent outline-0"
            [formControl]="ctrl"
            [placeholder]="placeholder()"
            type="number"
            [attr.id]="fieldId() || null"
            [attr.aria-describedby]="ariaDescribedBy()"
            [min]="min()"
            [max]="max()" />
        </div>
        <button type="button" class="h-full w-[56px]" (click)="onPlus()">
          <app-icon name="plus" [strokeWidth]="2" />
        </button>
      </div>
    </div>
  `,
  styles: `
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
      color: transparent;
    }

    .input-quantity {
      border-color: var(--stroke-action-box-and-line);
      transition:
        background var(--p-inputtext-transition-duration),
        color var(--p-inputtext-transition-duration),
        border-color var(--p-inputtext-transition-duration),
        outline-color var(--p-inputtext-transition-duration),
        box-shadow var(--p-inputtext-transition-duration);
    }

    .input-quantity:hover {
      border-color: var(--p-inputtext-hover-border-color);
    }

    .input-quantity button {
      background-color: var(--background-action-soft-selected);
      color: var(--stroke-action-active);
    }
  `,
})
export class InputQuantityComponent extends FormItemBaseComponent<number> {
  fieldId = input<string>();
  label = input<string>();
  placeholder = input<string>();
  ariaDescribedBy = input<string>();
  min = input<number>(0);
  max = input<number | null>(null);
  step = input<number>(1);
  styleClass = input<string>();

  constructor() {
    super();
    this.ctrl.valueChanges.subscribe((value) => {
      if (value === null) {
        this.onChange?.(0);
      } else {
        this.onChange?.(value);
      }
    });
  }

  onBlur() {
    this.onTouched?.();
  }

  onFocus() {
    this.onTouched?.();
  }

  onMinus() {
    const value = this.ctrl.value ?? 0;
    if (value > this.min()) {
      this.ctrl.setValue(value - this.step());
    }
  }

  onPlus() {
    const value = this.ctrl.value ?? 0;
    if (value < (this.max() ?? Infinity)) {
      this.ctrl.setValue(value + this.step());
    }
  }
}
