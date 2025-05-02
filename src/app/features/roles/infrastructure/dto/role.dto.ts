import { z } from 'zod';

export const RoleResponseDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  permissions: z.array(
    z.object({
      parentKey: z.string(),
      permissions: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
    }),
  ),
});

export type RoleResponseDto = z.infer<typeof RoleResponseDtoSchema> & {
  id: string;
  name: string;
  permissions: [
    {
      parentKey: string;
      permissions: {
        id: number;
        name: string;
      }[];
    },
  ];
};
