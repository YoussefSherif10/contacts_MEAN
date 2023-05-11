import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContactModel} from "../../models/contact.model";

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contact!: ContactModel;
  @Output() handleDelete = new EventEmitter();
  confirmDelete: boolean = false;

  onDelete(id: string) {
    this.handleDelete.emit(id);
  }
}
