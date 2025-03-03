import {inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {formatNumber} from '@angular/common';

@Pipe({
  name: 'mycurrency',
  standalone: true
})
export class MycurrencyPipe implements PipeTransform {
  private locale = inject(LOCALE_ID);

  transform(
    value: number,
    currencyCode: string = 'EUR',
    display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
    digitsInfo: string = '2.2-2'
  ): string | null {
    const formattedValue = formatNumber(value, this.locale, digitsInfo);
    return `${formattedValue} ${currencyCode}`;
  }
}
