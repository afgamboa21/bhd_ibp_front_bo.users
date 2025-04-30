import { z } from 'zod';

export const PermissionResponseDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  moduleResponse: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      route: z.string(),
      requires_Aprovals: z.boolean(),
    }),
  ),
});

export type PermissionResponseDto = z.infer<typeof PermissionResponseDtoSchema> & {
  id: string;
  name: string;
  moduleResponse: [
    {
      id: string;
      name: string;
      route: string;
      requires_Aprovals: boolean;
    }[],
  ];
};
