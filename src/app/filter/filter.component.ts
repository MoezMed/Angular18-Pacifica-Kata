import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../shared/model/product';
import {FilterModel} from '../shared/model/filter';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InfoTofiltreModel} from '../shared/model/infoTofiltre.model';
import {NgClass, NgForOf} from '@angular/common';
import {
  PacificaSelectCommunComponent
} from '../shared/commun/pacifica-select/component/pacifica-select-commun.component';
import {ItemValue} from '../shared/commun/pacifica-select/model/ItemValue';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    PacificaSelectCommunComponent,
    NgClass,
    ReactiveFormsModule
  ]
})
export class FilterComponent implements OnInit {

  categories: string[] = [];

  @Output() filterToApply = new EventEmitter<FilterModel>();

  @Input() products: Product[] = [];
  protected filtreCategoryCheckbox: ItemValue[] = [];
  isFilterOpen = false;

  protected filtreForm!: FormGroup<{
    filtreProductNameForm: FormControl<string>;
    filtreCategoryForm: FormControl<string>;
    filtreIsImportedForm: FormControl<boolean | undefined>;
    sortPriceForm: FormControl<string | undefined>; // New control
  }>;


  readonly importOptions: ItemValue[] = [
    {value: true, label: 'Oui'},
    {value: false, label: 'Non'},
    {value: undefined, label: 'Tous'}
  ];
  readonly sortOptions: ItemValue[] = [
    {value: undefined, label: 'Prix par défaut'},
    {value: 'asc', label: 'Prix croissant'},
    {value: 'desc', label: 'Prix décroissant'}
  ];

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  /**
   * method to initialize the form
   * @private
   */

  private initializeForm(): void {
    this.filtreForm = this.formBuilder.nonNullable.group({
      filtreProductNameForm: this.formBuilder.nonNullable.control<string>(''),
      filtreCategoryForm: this.formBuilder.nonNullable.control<string>(''),
      filtreIsImportedForm: this.formBuilder.nonNullable.control<boolean | undefined>(undefined),
      sortPriceForm: this.formBuilder.nonNullable.control<string | undefined>(undefined)
    });
  }

  ngOnInit(): void {
    this.setupFilters();
  }

  private setupFilters() {
    this.libelleNombreTotalProducts += this.generateLibelleNombreProducts(this.products.length);
    this.setCategotyList();
    this.setupFormSubscription();
  }

  private setupFormSubscription() {
    this.filtreForm.valueChanges.subscribe(formValue => {
      const filterModel: FilterModel = {
        productName: formValue.filtreProductNameForm ?? '',
        category: formValue.filtreCategoryForm ?? '',
        isImported: formValue.filtreIsImportedForm,
        sortPrice: formValue.sortPriceForm ?? ''
      };
      this.filterToApply.emit(filterModel);
    });
  }


  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  libelleNombreTotalProducts: string = '(Total de ';

  /**
   * method to set the list of categories
   */
  private setCategotyList() {
    if (this.products.length > 0) {
      this.products.map(product => {
        if (!this.categories.includes(product.category)) {
          this.categories.push(product.category.toUpperCase());
        }
      });
      this.filtreCategoryCheckbox = this.countProductsByCategory(this.products);
    }
  }

  /**
   * method to set the list of categories
   */
  private convertInfoToCheckboxObject(countCategory: { [p: string]: InfoTofiltreModel }): ItemValue[] {
    let filtreCheckbox: ItemValue[] = [];
    for (let key in countCategory) {
      if (countCategory.hasOwnProperty(key)) {

        let info: InfoTofiltreModel = countCategory[key];

        filtreCheckbox.push({
          value: info.code,
          label: info.libelle + ' (' + info.countCategory + ')',
        });
      }
    }
    return filtreCheckbox;
  }

  /**
   * method to calculate the count of products by category
   * @param products
   * return ItemValue[]
   * @private
   */
  private countProductsByCategory(products: Product[]): ItemValue[] {
    let countDocsByTypeMetierOfContrat: { [key: string]: InfoTofiltreModel } = {};

    products.forEach((products: Product) => {
      if (products.category) {
        const key = products.category;
        if (countDocsByTypeMetierOfContrat[key]) {
          countDocsByTypeMetierOfContrat[key].countCategory++;
        } else {
          countDocsByTypeMetierOfContrat[key] = {
            countCategory: 1, libelle: products.category.toUpperCase(), code: products.category
          };
        }
      }
    });

    return this.convertInfoToCheckboxObject(countDocsByTypeMetierOfContrat);
  }

  /**
   * method to generate the label of the number of products
   * @param valueNombreProduct
   * @returns string
   * @private
   */
  private generateLibelleNombreProducts(valueNombreProduct: number): string {
    if (!valueNombreProduct) {
      return '0)';
    } else {
      return (valueNombreProduct === 1 ? '1 produit)' : `${valueNombreProduct} produits)`);
    }
  }

}
