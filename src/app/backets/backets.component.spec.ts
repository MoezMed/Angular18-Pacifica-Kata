import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsService } from '../shared/services/products.service';
import { TaxCalculatorService } from '../shared/services/taxes-calculation.service';
import { of } from 'rxjs';
import { Product } from '../shared/model/product';
import { Basket } from '../shared/model/basket';
import {BacketsComponent} from './backets.component';
import {ActivatedRoute} from '@angular/router';

describe('BacketsComponent', () => {
  let component: BacketsComponent;
  let fixture: ComponentFixture<BacketsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let taxCalculatorService: jasmine.SpyObj<TaxCalculatorService>;

  const mockProducts: Product[] = [
    {
      id: 1,
      productName: 'Book',
      price: 10,
      quantity: 5,
      isImported: false,
      category: 'Books',
      taxes: 1,
      priceTTC: 11,
      nbrArticleAddedToBasket: 1
    }
  ];

  const mockBasket: Basket = {
    products: mockProducts,
    total_Taxes: 1,
    price_total_TTC: 11
  };

  const mockActivatedRoute = {
    params: of({}),
    snapshot: {
      paramMap: {
        get: () => '1'
      }
    }
  };

  beforeEach(async () => {

    const productsSpy = jasmine.createSpyObj('ProductsService', ['getProductList', 'getBasket', 'setBasket' , 'getProductListAsValue']);
    const taxCalculatorSpy = jasmine.createSpyObj('TaxCalculatorService', ['calculateBasketTotals']);

    productsSpy.getProductList.and.returnValue(of(mockProducts));
    productsSpy.getBasket.and.returnValue(mockBasket);

    await TestBed.configureTestingModule({
      imports: [BacketsComponent],
      providers: [
        { provide: ProductsService, useValue: productsSpy },
        { provide: TaxCalculatorService, useValue: taxCalculatorSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    taxCalculatorService = TestBed.inject(TaxCalculatorService) as jasmine.SpyObj<TaxCalculatorService>;

    fixture = TestBed.createComponent(BacketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with products and basket on ngOnInit', () => {
    expect(component.products).toEqual(mockProducts);
    expect(component.basket).toEqual(mockBasket);
    expect(taxCalculatorService.calculateBasketTotals).toHaveBeenCalledWith(mockBasket);
    expect(productsService.setBasket).toHaveBeenCalledWith(mockBasket);
  });

  it('should update basket and recalculate totals when setBasketandCalculateTaxes is called', () => {
    const newBasket: Basket = {
      products: [...mockProducts],
      total_Taxes: 2,
      price_total_TTC: 22
    };

    component.setBasketandCalculateTaxes(newBasket);

    expect(component.basket).toEqual(newBasket);
    expect(taxCalculatorService.calculateBasketTotals).toHaveBeenCalledWith(newBasket);
    expect(productsService.setBasket).toHaveBeenCalledWith(newBasket);
  });

  it('should calculate totals and update basket when calculateTotalesTaxesAndPrices is called', () => {
    component.basket = mockBasket;

    // Access private method through any type casting
    (component as any).calculateTotalesTaxesAndPrices();

    expect(taxCalculatorService.calculateBasketTotals).toHaveBeenCalledWith(mockBasket);
    expect(productsService.setBasket).toHaveBeenCalledWith(mockBasket);
  });
});
