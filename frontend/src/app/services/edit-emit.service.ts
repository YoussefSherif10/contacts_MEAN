import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ContactModel} from "../models/contact.model";

@Injectable({
  providedIn: 'root'
})
export class EditEmitService {
  private subject = new Subject();
  constructor() { }

  setMessage(event: string, id: string, contact: ContactModel): void {
    this.subject.next({event, id, contact});
  }

  clearMessage(): void {
    this.subject.next({event: 'clear'});
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
