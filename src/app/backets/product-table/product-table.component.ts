import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {Product} from '../../shared/model/product';
import {MycurrencyPipe} from '../../shared/pipes/mycurrency';
import {Basket} from '../../shared/model/basket';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  standalone: true,
  imports: [
    MycurrencyPipe
  ]
})
export class ProductTableComponent implements OnInit {
  @Input() product!: Product;
  @Output() basketUpdated: EventEmitter<Basket>  = new EventEmitter<Basket>;
  products: Product[] = [];
  basket!: Basket;

  private readonly productService = inject(ProductsService);

  /**
   * method ngOnInit
   * permet d'initialiser la liste des produits
   */
  ngOnInit(): void {
    this.basket = this.productService.getBasket();
    this.products = this.productService.getProductListAsValue();
  }

  /**
   * method deleteProduct
   * permet de supprimer un produit de la basket
   */
  deleteAProduct(product: Product) {
    const indexProductToDelete = this.basket.products.findIndex(p => p.id === product.id);
    const indexProductToUpdate = this.products.findIndex(p => p.id === product.id);
    const QuantityAlreadyAdded= this.basket.products[indexProductToDelete].nbrArticleAddedToBasket;

    this.basket.products.splice(indexProductToDelete, 1);
    this.products[indexProductToUpdate].quantity+=QuantityAlreadyAdded;

    this.productService.setProductList(this.products);
    this.basketUpdated.emit(this.basket);
    this.productService.setBasket(this.basket);
  }

  updateArticleQuantity(isIncrement: boolean, product: Product) {
    // Find product in basket
    const basketProduct = this.basket.products.find(p => p.id === product.id);

    if (basketProduct) {
      if (isIncrement) {
        basketProduct.nbrArticleAddedToBasket++;
        basketProduct.quantity--;
      } else {
        basketProduct.nbrArticleAddedToBasket--;
        basketProduct.quantity++;
      }
    }

    // Update products list
    this.products = this.products.map(p => {
      if (p.id === product.id) {
        return {
          ...p,
          nbrArticleAddedToBasket: basketProduct?.nbrArticleAddedToBasket || 0,
          quantity: basketProduct?.quantity || p.quantity
        };
      }
      return p;
    });

    // Update current product if needed
    if (this.product?.id === product.id) {
      this.product = {
        ...this.product,
        nbrArticleAddedToBasket: basketProduct?.nbrArticleAddedToBasket || 0,
        quantity: basketProduct?.quantity || this.product.quantity
      };
    }

    // Emit updates
    this.productService.setProductList(this.products);
    this.basket.products = this.products;
    this.basketUpdated.emit(this.basket);
  }
}
