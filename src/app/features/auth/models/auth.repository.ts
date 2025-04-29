import { LoginCredentials } from '@/app/features/auth/models/login-credentials';
import { AuthUser } from '@/app/features/auth/models/auth-user';

export abstract class AuthRepository {
  abstract login(credentials: LoginCredentials): Promise<AuthUser>;
}
