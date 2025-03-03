import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {ProductCardComponent} from './product-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {registerLocaleData} from '@angular/common';
import localefr from '@angular/common/locales/fr';
import {LOCALE_ID} from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {MycurrencyPipe} from '../../shared/pipes/mycurrency';
import {SharedModule} from 'primeng/api';

describe('ProductCardComponent', () => {
    const el = (selector: string) => fixture.nativeElement.querySelector(selector);
    let component: ProductCardComponent;
    let fixture: ComponentFixture<ProductCardComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductsService>;
  registerLocaleData(localefr, 'fr-fr');
    beforeEach(async () => {
      productServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductList']);
        await TestBed.configureTestingModule({
            declarations: [ProductCardComponent, MycurrencyPipe],
            imports: [SharedModule,HttpClientTestingModule, RouterTestingModule],
          providers: [  {provide: LOCALE_ID, usevalue: 'FR-fr'},
            {provide: ProductsService, useValue: productServiceSpy},]
        }).compileComponents();
        fixture = TestBed.createComponent(ProductCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show cart logo', () => {
        const cartLogo = el('[data-test="card-logo"]').textContent;
        expect(cartLogo).toBeDefined();
    });

    it('should show card title', () => {
        const title = el('[data-test="card-title"]').textContent;
        expect(title).toBeDefined();
        expect(title).toContain('Basket 1');
    });

    it('should show products', () => {
        const products = fixture.nativeElement.querySelectorAll('[data-test="cart-product"]');
        expect(products.length).toBe(3);
    });

    it('should show order button', () => {
        const orderButton = el('[data-test="order-btn"]').textContent;
        expect(orderButton).toBeDefined();
    });

});
