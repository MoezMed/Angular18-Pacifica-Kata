import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BacketsComponent} from './backets.component';
import {ProductsService} from '../shared/services/products.service';


describe('BacketsComponent', () => {
  let component: BacketsComponent;
  let fixture: ComponentFixture<BacketsComponent>;
  const el = (selector: string) => fixture.nativeElement.querySelector(selector);
  let productServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductList']);
    await TestBed.configureTestingModule({
      declarations: [BacketsComponent],
      providers: [{provide: ProductsService, useValue: productServiceSpy},]
    }).compileComponents();
    fixture = TestBed.createComponent(BacketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
