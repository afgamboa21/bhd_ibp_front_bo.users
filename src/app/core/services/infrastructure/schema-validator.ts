import { SafeAny } from '@/app/core/types/types/safe-any';
import { ZodObject } from 'zod';

export class SchemaValidator {
  /**
   * Validate a given `data` object against a given `schema`.
   *
   * @param schema - The schema to validate against.
   * @param data - The data to validate.
   *
   * @returns A `SafeParseResult` containing the outcome of the validation.
   */
  static validate(schema: ZodObject<SafeAny>, data: unknown) {
    return schema.safeParse(data);
  }
}
