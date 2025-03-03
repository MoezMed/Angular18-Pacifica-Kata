import {Product} from './product';

export interface Basket {
  id?: number;
  products: Product[];
  total_Taxes: number;
  price_total_TTC: number;

}
