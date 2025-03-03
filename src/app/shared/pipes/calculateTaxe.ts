import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../model/product';

@Pipe({
  name: 'calculateTaxe',
  standalone: true
})
export class calculateTaxesPipe implements PipeTransform {
  transform(product: Product): number {
    let taxAdded = 0;
    if (product.isImported) {
      taxAdded = product.price * 0.05;
    }
    switch (product.category) {
      case 'Food':
        return Math.round(taxAdded * 20) / 20.0;
      case 'Medecine':
        return Math.round(taxAdded * 20) / 20.0;
      case 'Books':
        return Math.round((product.price * 0.1 + taxAdded) * 20) / 20.0;
      default:
        return Math.round((product.price * 0.2 + taxAdded) * 20) / 20.0;
    }
  }
}
