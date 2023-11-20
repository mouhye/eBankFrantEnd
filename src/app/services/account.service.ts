import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {SavingAccount} from "../model/SavingAccount.model";
import {CurrentAccount} from "../model/CurrentAccount.model";
import {AccountHistory} from "../model/AccountHistory";
import {DebitRequest} from "../model/DebitRequest.model";
import {Operation} from "../model/Operation.model";
import {CreditRequest} from "../model/CreditRequest.model";
import {TransferRequest} from "../model/TransferRequest.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  getAccountByID(id:string):Observable<SavingAccount|CurrentAccount>{
    return this.http.get<SavingAccount|CurrentAccount>(environment.backendHost+"/accounts/id/"+id);
  }
  getListAccountByCustomer(id:number):Observable<Array<SavingAccount&CurrentAccount>>{
    return this.http.get<Array<SavingAccount&CurrentAccount>>(environment.backendHost+"/accounts/"+id)
  }
  getAccountHistory(id:string,page:number=0,size:number=5):Observable<AccountHistory>{
    return this.http.get<AccountHistory>(environment.backendHost+"/accounts/"+id+"/operations/page?page="+page+"&size="+size)
  }

    debit(req: DebitRequest):Observable<Operation> {
        return this.http.post<Operation>(environment.backendHost+"/accounts/debit",req);
    }

  credit(req: CreditRequest):Observable<Operation> {
    return this.http.post<Operation>(environment.backendHost+"/accounts/credit",req);
  }

  transfer(req: TransferRequest):Observable<Operation> {
    return this.http.post<Operation>(environment.backendHost+"/accounts/transfer",req);
  }

  newSavingAccount(sa: SavingAccount, id: number):Observable<SavingAccount> {
    return this.http.post<SavingAccount>(environment.backendHost+"/savingAccount/"+id,sa)
  }

  newCurrentAccount(ca: CurrentAccount, id: number):Observable<CurrentAccount> {
    return this.http.post<CurrentAccount>(environment.backendHost+"/currentAccount/"+id,ca)
  }
}
