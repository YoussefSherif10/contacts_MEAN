import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {Observable} from "rxjs";
import {ContactModel} from "../models/contact.model";

const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  login(user: UserModel): Observable<string> {
    return this.http.post<string>(`${apiUrl}/users/login`, user);
  }

  addContact(contact: ContactModel): Observable<ContactModel> {
    return this.http.post<ContactModel>(`${apiUrl}/contacts`, contact);
  }

  getContacts(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(`${apiUrl}/contacts`);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${apiUrl}/contacts/${id}`);
  }

  editContact(id: string, contact: ContactModel): void {
    this.http.put<ContactModel>(`${apiUrl}/contacts/${id}`, contact).subscribe();
  }
}
