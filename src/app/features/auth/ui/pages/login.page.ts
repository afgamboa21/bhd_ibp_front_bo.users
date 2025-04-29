import { Component, inject } from '@angular/core';
import { AuthUseCasesService } from '@/app/features/auth/application/auth-use-cases.service';
import { LoginFormComponent } from '../components/login-form.componen';
import { LoginCredentials } from '../../models/login-credentials';
import { provideAuth } from '@/app/features/auth';

@Component({
  imports: [LoginFormComponent],
  providers: [provideAuth()],
  template: `
    <main class="w-screen h-screen grid place-items-center p-4 md:p-8">
      <app-login-form (authData)="onAuthData($event)" />
    </main>
  `,
})
export class LoginPage {
  private authService = inject(AuthUseCasesService);

  async onAuthData(credentials: LoginCredentials) {
    const response = await this.authService.login(credentials);
    console.log(response);
  }
}
