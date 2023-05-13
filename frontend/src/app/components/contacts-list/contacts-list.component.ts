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
    editedBy: ''
  };
  showForm: boolean = false;
  alertForm: boolean = false;
  contacts!: ContactModel[];
  pages!: number[];
  currentPage: number = 1;
  name!: string;
  getSubscription!: Subscription;
  addSubscription!: Subscription;
  deleteSubscription!: Subscription;
  editSubscription!: Subscription;

  constructor(private data: DataService, private edit: EditEmitService) {
    const token = localStorage.getItem("token");

    const base64Url = token?.split('.')[1];
    const base64 = base64Url?.replace('-', '+').replace('_', '/');
    // @ts-ignore
    this.name = JSON.parse(window.atob(base64)).name;


    this.editSubscription = this.edit.getMessage().subscribe(msg => {
      if (msg.event === 'edit') {
        // @ts-ignore
        this.data.editContact(msg.id, msg.contact, token);
        const index = this.contacts.findIndex(c => c._id == msg.id);
        this.contacts.splice(index, 1, msg.contact);
      }
    })

    setInterval(() => {
      this.data.getContacts((this.currentPage - 1) * 5).subscribe(res => {
        const editedContact = res.contacts.findIndex((c: ContactModel) => (c.editedBy !== this.name && c.editedBy));
        if (editedContact !== -1)
          this.showLocked(editedContact);
      })
    }, 120000); // 2 minutes
  }

  ngOnInit() {
    this.getSubscription = this.data.getContacts(0).subscribe(res => {
      this.contacts = res.contacts;
      this.pages = Array(res.pages).fill(0).map((x, i) => i);
      const editedContact = res.contacts.findIndex((c: ContactModel) => (c.editedBy !== this.name && c.editedBy));
      if (editedContact !== -1)
        this.showLocked(editedContact);
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

  onClick(currentPage: number) {
    this.currentPage = currentPage;
    this.getSubscription = this.data.getContacts((currentPage - 1) * 5).subscribe(res => {
      this.contacts = res.contacts;
      this.pages = Array(res.pages).fill(0).map((x, i) => i);
      const editedContact = res.contacts.findIndex((c: ContactModel) => (c.editedBy !== this.name && c.editedBy));
      if (editedContact !== -1)
        this.showLocked(editedContact);
    })
  }

  showLocked(editedContact: number) {
    const edited: ContactModel = {
      name: "locked",
      phone: "locked",
      address: "locked",
      notes: "locked",
      _id: "locked",
      editedBy: "locked",
    }
    this.contacts.splice(editedContact, 1, edited);
  }

  ngOnDestroy() {
    if (this.addSubscription)
      this.addSubscription.unsubscribe();
    if (this.getSubscription)
      this.getSubscription.unsubscribe();
    if (this.deleteSubscription)
      this.deleteSubscription.unsubscribe();
  }
}
