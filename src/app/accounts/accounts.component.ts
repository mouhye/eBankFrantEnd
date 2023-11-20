import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {SavingAccount} from "../model/SavingAccount.model";
import {CurrentAccount} from "../model/CurrentAccount.model";
import {AccountType} from "../model/AccountType.model";
import {DebitRequest} from "../model/DebitRequest.model";
import {Operation} from "../model/Operation.model";
import {CreditRequest} from "../model/CreditRequest.model";
import {TransferRequest} from "../model/TransferRequest.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
account!:SavingAccount|CurrentAccount;
accountForm!:FormGroup;
savingAccount!:SavingAccount;
currentAccount!:CurrentAccount;
debitForm!:FormGroup;
creditForm!:FormGroup;
transferForm!:FormGroup
accountOperation!:Operation;
protected readonly AccountType = AccountType;

  constructor(private service:AccountService,private fb:FormBuilder) {
  }
  ngOnInit(): void {
      this.accountForm=this.fb.group({
         id:this.fb.control("",[Validators.required,Validators.minLength(36),Validators.maxLength(36)])
      })
      this.debitForm=this.fb.group({
          mountDebit:this.fb.control(0),
          debitDescription:this.fb.control("debit description")
      })
      this.transferForm=this.fb.group({
          idDestination:this.fb.control(""),
          mountTransfer:this.fb.control(0),
          transferDescription:this.fb.control("Transfer description")
      })
      this.creditForm=this.fb.group({
          mountCredit:this.fb.control(0),
          creditDescription:this.fb.control("Credit description")
      })
  }

  findAccountByID() {
    let sid=this.accountForm.value.id;
    this.service.getAccountByID(sid).subscribe(value => {
        this.account=value
        if (value.type==AccountType.SAVING_ACCOUNT){
            this.account=value
            this.savingAccount=(value as SavingAccount)
        }
        if(value.type==AccountType.CURRENT_ACCOUNT){
            this.account=value
            this.currentAccount=(value as CurrentAccount)
        }
    })
  }

  debit() {
    let req = new DebitRequest()
    req.mountDebit=this.debitForm.value.mountDebit
    req.description=this.debitForm.value.debitDescription
    req.accountId=this.account.id
    this.service.debit(req).subscribe(value => {
      this.accountOperation=value;
    })
  }

  credit() {
    let req=new CreditRequest()
    req.accountId=this.account.id
    req.mountCredit=this.creditForm.value.mountCredit
    req.description=this.creditForm.value.creditDescription
    this.service.credit(req).subscribe(value => {
      this.accountOperation=value;
    })
  }

  transfer() {
    let req=new TransferRequest()
    req.accountIdDestination=this.transferForm.value.idDestination;
    req.accountIdSource=this.account.id;
    req.mountTransfer=this.transferForm.value.mountTransfer;
    req.description=this.transferForm.value.transferDescription;
    this.service.transfer(req).subscribe(value => {
      this.accountOperation=value
    })
  }
}
