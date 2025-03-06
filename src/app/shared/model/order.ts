import { Product } from './product';

export interface Order {
    product: Product;
    quantity: number;
}
