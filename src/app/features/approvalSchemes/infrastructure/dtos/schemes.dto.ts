import { z } from 'zod';

export const SchemesResponseDtoSchema = z.object({
  total: z.number(),
  currentPage: z.number(),
  limit: z.number(),
  approvalSchemes: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export type SchemesResponseDto = z.infer<typeof SchemesResponseDtoSchema>;
