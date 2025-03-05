import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Basket} from '../model/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor() { }

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

}
