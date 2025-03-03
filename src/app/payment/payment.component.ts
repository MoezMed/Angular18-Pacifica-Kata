import {Component, OnDestroy} from '@angular/core';
import {MycurrencyPipe} from '../shared/pipes/mycurrency';
import {Subscription} from 'rxjs';
import {ProductsService} from '../shared/services/products.service';

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

  constructor(private productService: ProductsService) {
    this.subscription = this.productService.$basket.subscribe(basket => {
      this.totaleAmount = basket.price_total_TTC;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
