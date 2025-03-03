export interface Product {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    isImported: boolean;
    category: string;
    taxes: number;
    priceTTC: number;
    nbrArticleAddedToBasket: number;
}
