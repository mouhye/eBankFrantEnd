import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/Customer.model";
import {environment} from "../../environments/environment.development";
import {Account} from "../model/Account.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers")
  }
  public searchCustomers(customerName:string ):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers/search/"+customerName)
  }

  addCustomer(newCustomer: Customer ):Observable<Customer> {
    return this.http.post<Customer>(environment.backendHost+"/customers",newCustomer)
  }

  deleteCustomer(cus: Customer):Observable<Object> {
    return this.http.delete<Object>(environment.backendHost+"/customers/"+cus.id);
  }

}
