import {Category} from './category';

export interface Product {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    isImported: boolean;
    category: Category;
    taxes: number;
    priceTTC: number;
    nbrArticleAddedToBasket: number;
}
