import { Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { AuthUser } from '../models/auth-user';
import { LoginCredentials } from '../models/login-credentials';
import { LoginResponseDto } from './dtos/login.dto';
import { loginDtoUserMapper } from './mappers/login-dto-user.mapper';

const MOCK_RESPONSE_OK: LoginResponseDto = {
  token: '1234567890',
  email: 'test@test.com',
  name: 'Test User',
  id: '1234567890',
};

@Injectable()
export class AuthApiMockService extends AuthApiService {
  override login(credentials: LoginCredentials): Promise<AuthUser> {
    if (credentials.id === '11111111111' && credentials.password === '1111') {
      return Promise.resolve(loginDtoUserMapper(MOCK_RESPONSE_OK));
    }
    return Promise.reject(new Error('Invalid credentials'));
  }
}
