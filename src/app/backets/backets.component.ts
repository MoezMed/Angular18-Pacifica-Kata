import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from '../shared/services/products.service';
import {ProductTableComponent} from './product-table/product-table.component';
import {Product} from '../shared/model/product';
import {MycurrencyPipe} from '../shared/pipes/mycurrency';
import {RouterLink} from '@angular/router';
import {Basket} from '../shared/model/basket';
import {TaxCalculatorService} from '../shared/services/taxes-calculation.service';

@Component({
  selector: 'app-backets',
  templateUrl: './backets.component.html',
  styleUrls: ['./backets.component.scss'],
  standalone: true,
  imports: [ProductTableComponent, MycurrencyPipe, RouterLink],
})
export class BacketsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly taxCalculatorService = inject(TaxCalculatorService);

  basket!: Basket;
  products: Product[] = [];

  ngOnInit(): void {

    this.productsService.getProductList()
      .subscribe(
      productList => {
        this.products = productList;
        this.basket = this.productsService.getBasket();
        this.calculateTotalesTaxesAndPrices();
      }
    );
  }

  /**
   * method to calculate total taxes and prices of all products
   * @private
   */

  private calculateTotalesTaxesAndPrices() {
    this.taxCalculatorService.calculateBasketTotals(this.basket);
    this.productsService.setBasket(this.basket);
  }

  /**
   * method to set new List of proucts and calculated a new total
   * @public
   */
  setBasketandCalculateTaxes($event: Basket) {
    this.basket = $event;
    this.calculateTotalesTaxesAndPrices();
  }

}
