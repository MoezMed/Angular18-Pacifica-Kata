import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../model/product';
import { Basket } from '../model/basket';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: 1,
      productName: 'Book',
      price: 12.49,
      quantity: 2,
      isImported: false,
      category: 'book',
      taxes: 0,
      priceTTC: 12.49,
      nbrArticleAddedToBasket: 0
    }
  ];

  const mockBasket: Basket = {
    price_total_TTC: 12.49,
    total_Taxes: 0,
    products: mockProducts
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProductsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get and set basket', () => {
    service.setBasket(mockBasket);
    expect(service.getBasket()).toEqual(mockBasket);
  });

  it('should get product list as observable', async () => {
    service.setProductList(mockProducts);
    const products = await firstValueFrom(service.getProductList());
    expect(products).toEqual(mockProducts);
  });

  it('should get product list as value', () => {
    service.setProductList(mockProducts);
    expect(service.getProductListAsValue()).toEqual(mockProducts);
  });

  it('should set product list', () => {
    service.setProductList(mockProducts);
    expect(service.$productList.getValue()).toEqual(mockProducts);
  });

  it('should get all products from HTTP', () => {
    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('assets/products.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should initialize with empty basket', () => {
    const initialBasket = service.getBasket();
    expect(initialBasket.price_total_TTC).toBe(0);
    expect(initialBasket.total_Taxes).toBe(0);
    expect(initialBasket.products).toEqual([]);
  });

  it('should initialize with empty product list', () => {
    const initialProducts = service.getProductListAsValue();
    expect(initialProducts).toEqual([]);
  });
});
