import {Component, inject, OnDestroy} from '@angular/core';
import {MycurrencyPipe} from '../shared/pipes/mycurrency';
import {Subscription} from 'rxjs';
import {ProductsService} from '../shared/services/products.service';
import {BasketService} from '../shared/services/basket.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    MycurrencyPipe
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnDestroy {
  totaleAmount: number = 0;
  private subscription: Subscription;

  private readonly basketService = inject(BasketService);


  constructor() {
    this.subscription = this.basketService.$basket.subscribe(basket => {
      this.totaleAmount = basket.price_total_TTC;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
