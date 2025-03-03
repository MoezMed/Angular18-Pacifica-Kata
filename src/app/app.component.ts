import {Component, computed, effect, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FooterComponent} from './shared/footer/footer.component';
import {HeaderComponent} from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {
    effect(() => {
      console.log('Quantity changed to', this.quantity());
      console.log('Total changed to', this.total());
       this.counter.set(4);
    }, { allowSignalWrites: true });
  }
  title = 'angular18-KataPacifica';
  price: number = 100;
  quantity= signal<number>(1);
  total = computed(() => this.price * this.quantity());
  counter = signal(0);


  increment()  {
    this.quantity.update((qu) => qu + 1);
  }
  decrement() {
    this.quantity.update((qu) => qu - 1);
  }
}
