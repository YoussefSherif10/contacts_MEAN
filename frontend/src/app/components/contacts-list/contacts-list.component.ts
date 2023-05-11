import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactModel} from "../../models/contact.model";
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";
import {EditEmitService} from "../../services/edit-emit.service";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  newContact: ContactModel = {
    _id: '',
    name: '',
    phone: '',
    address: '',
    notes: '',
  };
  showForm: boolean = false;
  alertForm: boolean = false;
  contacts!: ContactModel[];
  getSubscription!: Subscription;
  addSubscription!: Subscription;
  deleteSubscription!: Subscription;
  editSubscription!: Subscription;

  constructor(private data: DataService, private edit: EditEmitService) {
    this.editSubscription = this.edit.getMessage().subscribe(msg => {
      if (msg.event === 'edit'){
        this.data.editContact(msg.id, msg.contact);
        const index = this.contacts.findIndex(c => c._id == msg.id);
        this.contacts.splice(index, 1, msg.contact);
      }
    })
  }

  ngOnInit() {
    this.getSubscription = this.data.getContacts().subscribe(res => {
      this.contacts = res;
    })
  }

  formIsValid() {
    return !!(this.newContact.name && this.newContact.phone);
  }

  addContact() {
    if (this.formIsValid()) {
      this.addSubscription = this.data.addContact(this.newContact).subscribe(res => {
        this.contacts.push(res);
        this.showForm = !this.showForm;
      })
    } else
      this.alertForm = true;
  }

  deleteContact(id: string) {
    this.deleteSubscription = this.data.deleteContact(id).subscribe(res => {
      const index = this.contacts.findIndex(c => c._id === id);
      this.contacts.splice(index, 1);
    })
  }

  ngOnDestroy() {
    if (this.addSubscription)
      this.addSubscription.unsubscribe();
    if  (this.getSubscription)
      this.getSubscription.unsubscribe();
    if (this.deleteSubscription)
      this.deleteSubscription.unsubscribe();
  }
}
