import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {Product} from '../../shared/model/product';
import {MycurrencyPipe} from '../../shared/pipes/mycurrency';
import {NgClass} from '@angular/common';
import {LogoByCategoryPipe} from '../../shared/pipes/logoByCategory';
import {Basket} from '../../shared/model/basket';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [MycurrencyPipe, NgClass, LogoByCategoryPipe],
})
export class ProductCardComponent implements OnInit {


  @Input() product!: Product;
  @Output() basketUpdated: EventEmitter<Basket> = new EventEmitter<Basket>;
  @Input() basket!: Basket;

  valueQuantity: string = '';
  products: Product[] = [];

  productsService = inject(ProductsService);

  /**
   * ngOnInit
   * method to get a new product list and valueuantity
   */
  ngOnInit(): void {
    this.productsService.getProductList().subscribe(
      (productList: Product[]) => {
        this.products = productList;
        this.updateQuantity(this.product);
      });
  }

  /**
   * method to add a new product and set a nw product list
   * @param product
   */

  addProductToBasket(product: Product): void {
    if(this.product.quantity === 0){
      return;
    }
    this.basket = this.productsService.getBasket();

    // Update the current product first
    this.product = {
      ...this.product,
      quantity: this.product.quantity - 1,
      nbrArticleAddedToBasket: (this.product.nbrArticleAddedToBasket || 0) + 1
    };

    const existingProduct = this.basket?.products.find(prod => prod.id === product.id);

    if (!existingProduct) {
      // Add new product to basket
      let productToAdd = {
        ...this.product,
        nbrArticleAddedToBasket: 1,
        quantity: this.product.quantity
      };
      this.basket.products.push(productToAdd);
    } else {
      // Update existing product in basket
      existingProduct.nbrArticleAddedToBasket++;
      existingProduct.quantity = this.product.quantity;
    }

    // Update products list
    this.products = this.products.map(prod =>
      prod.id === product.id ? this.product : prod
    );

    // Emit updates
    this.basketUpdated.emit(this.basket);
    this.productsService.setProductList(this.products);
    this.updateQuantity(this.product);
  }

  /**
   * method to update quantity label after each action
   * @param product
   */

  private updateQuantity(product: Product): void {
    this.valueQuantity = product.quantity > 0 ? "Quantité: " + product.quantity : "Non disponible";
  }
}
