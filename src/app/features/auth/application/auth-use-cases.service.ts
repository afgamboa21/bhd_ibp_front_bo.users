import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/login-credentials';
import { AuthUser } from '../models/auth-user';
import { AuthRepository } from '../models/auth.repository';

@Injectable()
export class AuthUseCasesService {
  constructor(private readonly repository: AuthRepository) {}

  login(credentials: LoginCredentials): Promise<AuthUser> {
    return this.repository.login(credentials);
  }
}
