import { Injectable } from '@angular/core';
import { HttpParamsBuilder, HttpService } from '@bhd/data-access';
import {
  LoginResponseDto,
  LoginResponseDtoSchema,
} from '@/app/features/auth/infrastructure/dtos/login.dto';
import { LoginCredentials } from '../models/login-credentials';
import { AuthUser } from '../models/auth-user';
import { loginDtoUserMapper } from '@/app/features/auth/infrastructure/mappers/login-dto-user.mapper';
import { AuthRepository } from '@/app/features/auth/models/auth.repository';
import { SchemaValidator } from '@/app/core/services/infrastructure/schema-validator';

@Injectable()
export class AuthApiService extends AuthRepository {
  constructor(private httpSvc: HttpService) {
    super();
  }

  async login(credentials: LoginCredentials): Promise<AuthUser> {
    const params = new HttpParamsBuilder('/bhdleon/api/v1/personal/web/login')
      .isPublic()
      .setBody(credentials)
      .build();

    const dto = await this.httpSvc.post<LoginResponseDto>(params);
    SchemaValidator.validate(LoginResponseDtoSchema, dto);
    return loginDtoUserMapper(dto);
  }
}
