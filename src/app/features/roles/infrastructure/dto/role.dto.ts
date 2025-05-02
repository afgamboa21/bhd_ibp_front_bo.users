import { z } from 'zod';

export const RoleResponseDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  permissions: z.array(
    z.object({
      permissions: z.array(z.number()),
    }),
  ),
});

export type RoleResponseDto = z.infer<typeof RoleResponseDtoSchema> & {
  id: string;
  name: string;
  description: string;
  permissions: number[];
};
