import { Component } from '@angular/core';
import {NavigateUserService} from "../../services/navigate-user.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  userName: string;


  constructor(private  navUser: NavigateUserService, ) {
    this.navUser.checkLogin();

    const base64Url = localStorage.getItem('token')?.split('.')[1];
    const base64 = base64Url?.replace('-', '+').replace('_', '/');
    // @ts-ignore
    this.userName = JSON.parse(window.atob(base64)).name;
  }


}
