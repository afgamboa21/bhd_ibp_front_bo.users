import { z } from 'zod';

export const LoginResponseDtoSchema = z.object({
  id: z.string(),
  token: z.string(),
});

export type LoginResponseDto = z.infer<typeof LoginResponseDtoSchema> & {
  name: string;
  email: string;
};
