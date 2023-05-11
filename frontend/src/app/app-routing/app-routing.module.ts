import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../components/login/login.component";
import {PageNotFoundComponent} from "../components/page-not-found/page-not-found.component";
import {ContactsListComponent} from "../components/contacts-list/contacts-list.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: ContactsListComponent},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
