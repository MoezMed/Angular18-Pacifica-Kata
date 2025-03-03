import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {FilterComponent} from './filter.component';
import {SharedModule} from 'primeng/api';

describe('ProductsComponent', () => {
    let component: FilterComponent;
    let fixture: ComponentFixture<FilterComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilterComponent],
            imports: [SharedModule, HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
        fixture = TestBed.createComponent(FilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
