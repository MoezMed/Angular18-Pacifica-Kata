import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/model/product';

@Component({
  selector: 'app-popup-delete-dialog',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.scss'],
  imports: [
    CommonModule,
    DialogModule
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class PopupDeleteComponent {
  @Input() showPopupDelete!: boolean;
  @Output() closePopup: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() confirmSuppression: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Input() product!: Product;

  delete() {
    this.confirmSuppression.emit(true);
    this.closePopup.next(false);
  }

  closeDialog(): void {
    this.closePopup.next(false);
  }
}
