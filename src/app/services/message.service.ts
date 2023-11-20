import {Observable, Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import {Customer} from "../model/Customer.model";

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private subject:Subject<Customer> = new Subject();

  sendMessage(msg:Customer) {
    // it is used to publish data
    this.subject.next(msg);
  }
  accessMessage():Observable<Customer> {
    // asObservable helps us to prevent the
    // leaks of Observable from outside of the subject
    return this.subject.asObservable();
  }
}
