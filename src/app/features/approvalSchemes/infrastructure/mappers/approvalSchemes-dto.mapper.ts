import { SchemesResponseDto } from '@/app/features/approvalSchemes/infrastructure/dtos/schemes.dto';
import { Scheme } from '../../models/schemes';

export const approvalSchemesDtoMapper = (dto: SchemesResponseDto): Scheme[] => {
  return dto.approvalSchemes.map(schemeDto =>
    new Scheme(schemeDto.id, schemeDto.name)
  );
};
