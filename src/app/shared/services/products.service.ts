import 'zone.js';
import 'zone.js/testing';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../model/product';
import {Basket} from '../model/basket';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {
  }

  $productList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  $basket: BehaviorSubject<Basket> = new BehaviorSubject<Basket>({
    price_total_TTC: 0,
    total_Taxes: 0,
    products: []
  });

  getBasket(): Basket {
    return this.$basket.getValue();
  }

  setBasket(newBasket: Basket) :void {
    this.$basket.next(newBasket);
  }

  getProductList(): Observable<Product[]> {
    return this.$productList.asObservable();
  }

  getProductListAsValue(): Product[] {
    return this.$productList.getValue();
  }

  setProductList(newProducts: Product[]) {
    this.$productList.next(newProducts);
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('assets/products.json');
  }
}
