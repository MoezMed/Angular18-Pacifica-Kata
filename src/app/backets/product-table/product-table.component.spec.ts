import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ProductTableComponent} from './product-table.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductsService} from '../../shared/services/products.service';
import {SharedModule} from 'primeng/api';

describe('ProductTableComponent', () => {
    const el = (selector: string) => fixture.nativeElement.querySelector(selector);
    let component: ProductTableComponent;
    let fixture: ComponentFixture<ProductTableComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductTableComponent],
            imports: [SharedModule, HttpClientTestingModule, RouterTestingModule],
            providers: [ProductsService]
        }).compileComponents();
        fixture = TestBed.createComponent(ProductTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
