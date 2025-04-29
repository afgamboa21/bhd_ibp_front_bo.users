import { Component, output, signal } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TestIdKitModule } from '@bhd/test-id-kit';
import { ButtonModule } from 'primeng/button';
import { InputTextComponent } from '@/app/shared/components/forms/input-text.component';
import { FormItemComponent } from '@/app/shared/components/forms/form-item.component';
import { ModelToForm } from '@/app/core/types/types/model-to-form';
import { ValidateForm } from '@/app/core/decorators/decorators/validate-form.decorator';
import { LoginCredentials } from '../../models/login-credentials';
import { IconComponent } from '@/app/shared/components/icons/icon.component';
import { InputMaskComponent } from '@/app/shared/components/forms/input-mask.component';
import { ButtonComponent } from '@/app/shared/components/forms/button.component';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    FormItemComponent,
    InputTextComponent,
    IconComponent,
    TestIdKitModule,
    InputMaskComponent,
    ButtonComponent,
    CheckboxModule,
  ],
  template: `<form [formGroup]="signInForm" (ngSubmit)="onSubmit()">
    <h1 class="mb-8">Login</h1>
    <app-form-item>
      <app-input-mask
        mask="999-9999999-9"
        [bhdTestId]="{
          type: 'btn',
          context: 'login',
          elValue: 'userId',
        }"
        fieldId="user-id"
        [label]="'userId' | translate"
        [placeholder]="'userId' | translate"
        formControlName="id">
        <app-icon class="text-gray-400" icon-start name="user" />
      </app-input-mask>
    </app-form-item>

    <app-form-item>
      <app-input-text
        [bhdTestId]="{
          type: 'btn',
          context: 'login',
          elValue: 'password',
        }"
        fieldId="password"
        [fieldType]="passwordVisible() ? 'text' : 'password'"
        [label]="'password' | translate"
        [placeholder]="'password' | translate"
        maxLength="4"
        formControlName="password">
        <app-icon class="text-gray-400" icon-start name="lock" />
        <button
          class="w-full h-full grid place-items-center text-gray-400"
          type="button"
          icon-end
          (click)="togglePassword()">
          <app-icon
            [name]="passwordVisible() ? 'eye-off' : 'eye'"
            [strokeWidth]="2" />
        </button>
      </app-input-text>
    </app-form-item>

    <div class="flex justify-end mt-6 mb-8">
      <p-checkbox value="New York" inputId="ny" />
      <label for="ny" class="ml-2">Recordar usuario</label>
    </div>

    <app-button type="submit" [block]="true" [label]="'login' | translate" />
  </form> `,
  styles: [
    `
      :host {
        @apply w-full;
        @apply max-w-[400px];
      }
    `,
  ],
})
export class LoginFormComponent {
  authData = output<LoginCredentials>();

  signInForm = buildForm();
  passwordVisible = signal(false);

  @ValidateForm('signInForm')
  async onSubmit() {
    if (this.signInForm.invalid) return;
    this.authData.emit(this.signInForm.getRawValue());
  }

  togglePassword() {
    this.passwordVisible.update((prev) => !prev);
  }
}

const buildForm = (): FormGroup<ModelToForm<LoginCredentials>> => {
  return new FormGroup({
    id: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ],
    }),
  });
};
