import { LoginResponseDto } from '@/app/features/auth/infrastructure/dtos/login.dto';
import { AuthUser } from '../../models/auth-user';

export const loginDtoUserMapper = (dto: LoginResponseDto): AuthUser => {
  return new AuthUser(dto.id, dto.name, dto.email);
};
