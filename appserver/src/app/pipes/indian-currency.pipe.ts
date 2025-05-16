import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianCurrency',
  standalone: true
})
export class IndianCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value)) return '0.00';
    
    const result = value.toString().split('.');
    let lastThree = result[0].substring(result[0].length - 3);
    const otherNumbers = result[0].substring(0, result[0].length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    
    const formattedNumber = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    
    const paise = result.length > 1 ? '.' + (result[1].length === 1 ? result[1] + '0' : result[1].substring(0, 2)) : '.00';
    
    return '₹' + formattedNumber + paise;
  }

}
