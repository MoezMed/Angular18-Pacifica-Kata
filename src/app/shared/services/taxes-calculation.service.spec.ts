import { TestBed } from '@angular/core/testing';
import {TaxCalculatorService} from './taxes-calculation.service';


describe('TaxesCalculationService', () => {
  let service: TaxCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
