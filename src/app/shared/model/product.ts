import {Category} from './category';

export interface Product {
    id: number;
    productName: string;
    price: number;
    isImported: boolean;
    category: Category;
}
