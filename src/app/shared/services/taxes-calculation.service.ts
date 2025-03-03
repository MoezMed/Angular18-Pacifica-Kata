import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import {calculateTaxesPipe} from '../pipes/calculateTaxe';


@Injectable({
  providedIn: 'root'
})
export class TaxCalculatorService {
  private taxPipe = new calculateTaxesPipe();

  updateProductTaxesAndPrices(product: Product): void {
    product.taxes = this.taxPipe.transform(product);
    product.priceTTC = product.price + product.taxes;
  }

  calculateBasketTotals(basket: any) {
    // Update taxes and prices for all products first
    basket.products.forEach((product: Product) => this.updateProductTaxesAndPrices(product));

    basket.total_Taxes = basket.products.reduce((total: number, product: Product) =>
      total + (product.taxes * product.nbrArticleAddedToBasket), 0);

    basket.price_total_TTC = basket.products.reduce((total: number, product: Product) =>
      total + (product.priceTTC * product.nbrArticleAddedToBasket), 0);
  }
}
