import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductsService } from '../shared/services/products.service';
import { of } from 'rxjs';
import { Product } from '../shared/model/product';
import { FilterModel } from '../shared/model/filter';
import { Basket } from '../shared/model/basket';
import {FilterComponent} from '../filter/filter.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  const mockProducts: Product[] = [
    {
      id: 1,
      productName: 'Book',
      price: 10,
      quantity: 5,
      isImported: false,
      category: 'Books',
      taxes: 0,
      priceTTC: 0,
      nbrArticleAddedToBasket: 0
    },
    {
      id: 2,
      productName: 'Imported Chocolate',
      price: 20,
      quantity: 3,
      isImported: true,
      category: 'Food',
      taxes: 0,
      priceTTC: 0,
      nbrArticleAddedToBasket: 0
    }
  ];

  const mockBasket: Basket = {
    products: [],
    total_Taxes: 0,
    price_total_TTC: 0
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', [
      'getProductList',
      'getAllProducts',
      'setProductList',
      'getBasket',
      'setBasket'
    ]);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, FilterComponent],
      providers: [
        { provide: ProductsService, useValue: spy }
      ]
    }).compileComponents();

    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  beforeEach(() => {
    productsService.getProductList.and.returnValue(of(mockProducts));
    productsService.getAllProducts.and.returnValue(of(mockProducts));
    productsService.getBasket.and.returnValue(mockBasket);

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with products on ngOnInit', () => {
    expect(component.products).toEqual(mockProducts);
    expect(component.allProducts).toEqual(mockProducts);
  });

  it('should fetch all products if initial product list is empty', fakeAsync(() => {
    productsService.getProductList.and.returnValue(of([]));
    component.ngOnInit();
    tick();

    expect(productsService.getAllProducts).toHaveBeenCalled();
    expect(productsService.setProductList).toHaveBeenCalledWith(mockProducts);
  }));

  it('should filter products by name', () => {
    const filter: FilterModel = {
      productName: 'book',
      category: '',
      isImported: undefined,
      sortPrice: ''
    };

    component.ApplyFilterToProductList(filter);
    expect(component.products.length).toBe(1);
    expect(component.products[0].productName).toBe('Book');
  });

  it('should filter products by category', () => {
    const filter: FilterModel = {
      productName: '',
      category: 'Food',
      isImported: undefined,
      sortPrice: ''
    };

    component.ApplyFilterToProductList(filter);
    expect(component.products.length).toBe(1);
    expect(component.products[0].category).toBe('Food');
  });

  it('should filter products by imported status', () => {
    const filter: FilterModel = {
      productName: '',
      category: '',
      isImported: true,
      sortPrice: ''
    };

    component.ApplyFilterToProductList(filter);
    expect(component.products.length).toBe(1);
    expect(component.products[0].isImported).toBeTrue();
  });

  it('should sort products by price ascending', () => {
    const filter: FilterModel = {
      productName: '',
      category: '',
      isImported: undefined,
      sortPrice: 'asc'
    };

    component.ApplyFilterToProductList(filter);
    expect(component.products[0].price).toBe(10);
    expect(component.products[1].price).toBe(20);
  });

  it('should sort products by price descending', () => {
    const filter: FilterModel = {
      productName: '',
      category: '',
      isImported: undefined,
      sortPrice: 'desc'
    };

    component.ApplyFilterToProductList(filter);
    expect(component.products[0].price).toBe(20);
    expect(component.products[1].price).toBe(10);
  });

  it('should update pagination correctly', () => {
    const event = {
      first: 10,
      rows: 15
    };

    component.onPageChange(event);
    expect(component.first).toBe(10);
    expect(component.nbProductParLot).toBe(15);
    expect(component.lastItem).toBe(25);
  });

  it('should update basket', () => {
    const newBasket: Basket = {
      products: mockProducts,
      total_Taxes: 100,
      price_total_TTC: 500
    };

    component.updateBasket(newBasket);
    expect(productsService.setBasket).toHaveBeenCalledWith(newBasket);
  });
});
