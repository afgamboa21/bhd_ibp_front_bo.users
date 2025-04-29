import { FormArray, FormControl, FormGroup } from '@angular/forms';

type IsOptional<T, K extends keyof T> = undefined extends T[K] ? true : false;

export type ModelToForm<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends (infer U)[]
      ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
        K extends `${infer _}FA`
        ? FormArray<FormGroup<ModelToForm<U>>>
        : IsOptional<T, K> extends true
          ? FormControl<T[K] | null>
          : FormControl<T[K]>
      : T[K] extends Date
        ? IsOptional<T, K> extends true
          ? FormControl<T[K] | null>
          : FormControl<T[K]>
        : FormGroup<ModelToForm<T[K]>>
    : T[K] extends Date
      ? IsOptional<T, K> extends true
        ? FormControl<T[K] | null>
        : FormControl<T[K]>
      : FormControl<T[K]>;
};

/**
 * Esto se debe utilizar únicamente para inicializar los valores de los formularios
 */
export const nullAs = <T>() => null as unknown as T;
