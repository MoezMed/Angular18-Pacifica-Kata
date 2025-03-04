import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {Product} from '../../shared/model/product';
import {MycurrencyPipe} from '../../shared/pipes/mycurrency';
import {Basket} from '../../shared/model/basket';
import {calculateTaxesPipe} from '../../shared/pipes/calculateTaxe';
import {PopupDeleteComponent} from '../../products/popup-delete/popup-delete.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  standalone: true,
  imports: [
    MycurrencyPipe,
    calculateTaxesPipe,
    PopupDeleteComponent
  ]
})
export class ProductTableComponent implements OnInit {
  @Input() product!: Product;
  @Output() basketUpdated: EventEmitter<Basket> = new EventEmitter<Basket>;
  products: Product[] = [];

  private readonly productService = inject(ProductsService);
  @Input() basket!: Basket;
  displayDialogSuppression= false;
  selectedProduct!: Product;

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
    const QuantityAlreadyAdded = this.basket.products[indexProductToDelete].nbrArticleAddedToBasket;

    this.basket.products.splice(indexProductToDelete, 1);
    this.products[indexProductToUpdate].quantity += QuantityAlreadyAdded;
    this.products[indexProductToUpdate].nbrArticleAddedToBasket = 0;

    this.productService.setProductList(this.products);
    this.basketUpdated.emit(this.basket);
    this.productService.setBasket(this.basket);
  }

  updateArticleQuantity(isIncrement: boolean, product: Product) {
    //TODO Add code here

  }

  openDeleteDialog(product: Product) {
    this.selectedProduct = product;
    this.displayDialogSuppression = true;
  }
}
