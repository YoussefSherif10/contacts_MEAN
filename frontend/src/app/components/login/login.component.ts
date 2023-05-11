import {Component, OnDestroy} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {Subscription} from "rxjs";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  user: UserModel = {
    name: '',
    password: ''
  };
  subscription!: Subscription;
  errorMsg!: string;

  constructor(private data: DataService, private router: Router) {
  }

  resetAndHide() {
    this.user.name = '';
    this.user.password = '';
  }

  formIsValid() {
    return !!(this.user.name && this.user.password);
  }

  submit() {
    if (this.formIsValid()) {
      this.subscription = this.data.login(this.user).subscribe(token => {
        localStorage.setItem("token", token);
        this.router.navigate(["/"]);
      }, error => {
        this.errorMsg = error.error.msg;
      })
    }
    else
      this.errorMsg = "All fields are required";
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
