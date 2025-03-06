import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ProductsService} from '../shared/services/products.service';
import {Product} from '../shared/model/product';
import {ProductCardComponent} from './products-card/product-card.component';
import {NgClass, SlicePipe} from '@angular/common';
import {FilterComponent} from '../filter/filter.component';
import {FilterModel} from '../shared/model/filter';
import {Paginator, PaginatorModule} from 'primeng/paginator';
import {NoProductsComponent} from './no-products/no-products.component';
import {Basket} from '../shared/model/basket';
import {BasketService} from '../shared/services/basket.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [ProductCardComponent, RouterLink, NgClass, FilterComponent, Paginator, SlicePipe, PaginatorModule, NoProductsComponent,],
})
export class ProductsComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly basketService = inject(BasketService);

  products: Product[] = [];
  allProducts: Product[] = [];
  filter: FilterModel = {
    productName: '',
    category: '',
    isImported: undefined,
    sortPrice: ''
  };

  // variables for Pagination
  public nbProductParLot: number = 9;
  public lastItem: number = 9;
  public first: number = 0;
  public isDisabledAllButton: boolean = false;
  protected basket: Basket = {} as Basket;

  ngOnInit(): void {
    this.productsService.getProductList().subscribe(
      (productList: Product[]) => {
        this.products = productList;
        this.allProducts = [...productList];

        if (productList.length === 0) {
          this.productsService.getAllProducts().subscribe(products => {
            this.products = products;
            this.allProducts = [...products];
            this.productsService.setProductList(products);
          });
        }
      }
    );

    this.basket = this.basketService.getBasket();
  }


  /**
   * method to filter products by category, product name and is imported
   * @returns void
   * @param filter
   */
  ApplyFilterToProductList(filter: FilterModel): void {
    console.log('filter', filter);
    let filteredProducts = [...this.allProducts];

    if (filter.productName !== '' && filter.productName) {
      filteredProducts = filteredProducts.filter(product =>
        product.productName.toLowerCase().includes(filter.productName.toLowerCase())
      );
    }

    if (filter.category !== '' && filter.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category.categoryName.toLowerCase() === filter.category.toLowerCase()
      );
    }

    if (filter.isImported !== undefined && filter.isImported !== '') {
      filteredProducts = filteredProducts.filter(product =>
        product.isImported === filter.isImported
      );
    }

    // Apply price sorting
    if (filter.sortPrice && filter.sortPrice !== '') {
      filteredProducts.sort((a, b) => {
        if (filter.sortPrice === 'asc') {
          return a.price - b.price;
        } else if (filter.sortPrice === 'desc') {
          return b.price - a.price;
        }
        return 0;
      });
    }

    this.products = filteredProducts;
  }


  /**
   * method to update the pagination
   * @returns void
   * @param event
   */
  onPageChange(event: any): void {
    this.first = event.first;
    this.nbProductParLot = event.rows;
    this.lastItem = this.first + this.nbProductParLot;
  }

  updateBasket($event: Basket): void {
    this.basketService.setBasket($event);
  }
}
