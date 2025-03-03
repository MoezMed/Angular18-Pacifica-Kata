import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {ProductsComponent} from './products.component';
import {SharedModule} from 'primeng/api';

describe('ProductsComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductsComponent],
            imports: [SharedModule,HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
