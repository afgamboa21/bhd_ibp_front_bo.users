import { Component, computed, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  template: `
    <p-button
      [styleClass]="btnSizeClasses() + ' ' + btnWidthClasses()"
      [label]="label()"
      [type]="type()"
      [class]="styleClass()"
      [disabled]="disabled()"
      [loading]="loading()"
      [severity]="severity()"
      [variant]="variant()">
      <ng-content />
    </p-button>
  `,
})
export class ButtonComponent {
  label = input.required<string>();
  severity = input<'success' | 'info' | 'warn' | 'danger' | 'primary'>(
    'primary',
  );
  size = input<'small' | 'medium' | 'large'>('large');
  variant = input<'outlined' | 'text' | undefined>(undefined);
  type = input<'button' | 'submit' | 'reset'>('button');
  block = input<boolean>(false);
  styleClass = input<string>();
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  btnSizeClasses = computed(() => {
    return {
      small: 'h-8',
      medium: 'h-12',
      large: 'h-14',
    }[this.size()];
  });

  btnWidthClasses = computed(() => {
    return this.block() ? 'w-full' : '';
  });
}
