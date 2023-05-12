import {Component, OnInit} from '@angular/core';
import {NavigateUserService} from "../../services/navigate-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactModel} from "../../models/contact.model";
import {DataService} from "../../services/data.service";
import {EditEmitService} from "../../services/edit-emit.service";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  contactId!: string | null;
  newContact: ContactModel = {
    _id: '',
    name: '',
    phone: '',
    address: '',
    notes: '',
    editedBy: ''
  };
  alertForm: boolean = false;

  constructor(private navUser: NavigateUserService, private route: ActivatedRoute, private router: Router, private edit: EditEmitService) {
    this.navUser.checkLogin();
  }

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('contactId');
    if (this.contactId != null) {
      this.newContact._id = this.contactId;
    }
  }

  editContact() {
    if (!(this.newContact.name && this.newContact.phone))
      this.alertForm = true;
    else {
      this.edit.setMessage('edit', this.newContact._id, this.newContact);
      this.edit.clearMessage();
      this.router.navigate(['/']);
    }
  }

}
