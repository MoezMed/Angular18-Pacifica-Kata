import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ItemValue} from '../model/ItemValue';

@Component({
  selector: 'pacifica-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pacifica-select-commun.component.html',
  styleUrls: ['./pacifica-select-commun.component.scss']
})
export class PacificaSelectCommunComponent implements OnInit {

  protected labelString: string = '';
  protected labelId: string = '';

  @Input() control: FormControl<string|boolean|undefined> = new FormControl();
  @Input() itemsValue: ItemValue[] = [];

  @Input() set label(label: string) {
    this.labelString = label;
    this.labelId = label.replace(/[\W_]+/g, '');
  }

  @Input() placeHolder: string = '';
  @Input() isRequired: boolean = false;

  ngOnInit(): void {

    if (this.isRequired) {
      this.control.setValidators(Validators.required);
      this.control.updateValueAndValidity();
    }
  }
}
