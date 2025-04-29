/**
 * Ejemplo de uso de librerías externas
 */

import { addDay as addDaysTempo } from '@formkit/tempo';

export const addDays = (date: string, days: number) => {
  return addDaysTempo(date, days);
};
