import {Component, inject, OnDestroy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {Subscription} from 'rxjs';
import {BasketService} from '../services/basket.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  counter: number = 0;
  private subscription: Subscription;

  private readonly basketService = inject(BasketService);

  constructor() {
    this.subscription = this.basketService.$basket.subscribe(basket => {
      this.counter = basket.products.reduce((sum, product) => sum + product.nbrArticleAddedToBasket, 0);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
