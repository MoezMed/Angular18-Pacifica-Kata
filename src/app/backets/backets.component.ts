import {Component, inject, OnInit, signal} from '@angular/core';
import {ProductsService} from '../shared/services/products.service';
import {ProductTableComponent} from './product-table/product-table.component';
import {Product} from '../shared/model/product';
import {MycurrencyPipe} from '../shared/pipes/mycurrency';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {Basket} from '../shared/model/basket';

@Component({
  selector: 'app-backets',
  templateUrl: './backets.component.html',
  styleUrls: ['./backets.component.scss'],
  standalone: true,
  imports: [ProductTableComponent, MycurrencyPipe, RouterLink, NgIf, NgForOf],
})
export class BacketsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  basket!: Basket;
  products: Product[] = [];
  TotalTaxes = 0;
  TotalPrice = 0;

  ngOnInit(): void {
    //toDo recupérer la nouvelle Liste
    this.productsService.getProductList().subscribe(
      productList => this.products = productList);
    this.basket = this.productsService.getBasket();

    this.calculateTotalesTaxesAndPrices();
  }

  /**
   * method to calculate total taxes and prices of all products
   * @private
   */

  private calculateTotalesTaxesAndPrices() {
    this.basket.total_Taxes = this.basket.products.reduce((total, product) => total + product.taxes, 0);
    this.basket.price_total_TTC = this.basket.products.reduce((total, product) => total + (product.priceTTC * product.nbrArticleAddedToBasket), 0);
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
