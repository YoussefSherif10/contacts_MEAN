import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {Observable} from "rxjs";

const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  login(user: UserModel): Observable<string> {
    return this.http.post<string>(`${apiUrl}/users/login`, user);
  }
}
