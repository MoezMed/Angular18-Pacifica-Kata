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
