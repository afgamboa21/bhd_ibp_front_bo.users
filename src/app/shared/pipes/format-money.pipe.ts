import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMoney',
  standalone: true,
})
export class FormatMoneyPipe implements PipeTransform {
  transform(
    value: number | null | undefined | string,
    withDecimals = true,
  ): string {
    if (value === null || value === undefined) {
      return '0';
    }

    const toStr = value.toString();
    const parts = toStr.split('.');
    const integerPart = parts[0];
    const decimalPart = (parts[1] || '00').padEnd(2, '0').slice(0, 2);

    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ',',
    );

    if (withDecimals) {
      return `${formattedIntegerPart}.${decimalPart}`;
    }

    return formattedIntegerPart;
  }
}
