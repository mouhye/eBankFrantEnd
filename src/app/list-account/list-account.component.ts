import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {SavingAccount} from "../model/SavingAccount.model";
import {CurrentAccount} from "../model/CurrentAccount.model";
import {Customer} from "../model/Customer.model";
import {AccountType} from "../model/AccountType.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit{
  listAccount!:Array<SavingAccount&CurrentAccount>;
  errorMessage!:Error;
  fullName!:string;
  customer!:Customer
  protected readonly AccountType = AccountType;
  newSavingAccountForm!: FormGroup;
  newCurrentAccountForm!:FormGroup;
  savingAccount!:SavingAccount
  constructor(private service:AccountService,private route: ActivatedRoute,private router:Router,private fb:FormBuilder) {
  }
  ngOnInit(): void {
   let id=this.route.snapshot.paramMap.get("id")
    // @ts-ignore
    this.getListAccount(id);
   this.newSavingAccountForm=this.fb.group({
     balanceInitial:this.fb.control(0),
     currency:this.fb.control("USD"),
     interestRate:this.fb.control(0.1)
   });
   this.newCurrentAccountForm=this.fb.group({
     balanceInitial:this.fb.control(0),
     currency:this.fb.control("USD"),
     overDraft:this.fb.control(1000)
   })
  }
getListAccount(id:number){
    this.service.getListAccountByCustomer(id).subscribe({
      next:value => {
        this.listAccount=value;
        this.fullName=<string>this.route.snapshot.paramMap.get("firstName")+" "+this.route.snapshot.paramMap.get("lastName")
      },
      error:err => {
        this.errorMessage=err
      }
    })
}



  listOperation(acc: SavingAccount & CurrentAccount) {
    this.router.navigate(["/operation",acc]).then()

  }

  newSavingAccount() {
    let id=this.route.snapshot.paramMap.get("id")
    let sa=new SavingAccount()
    sa.interestRate=this.newSavingAccountForm.value.interestRate
    sa.currency=this.newSavingAccountForm.value.currency
    sa.balance=this.newSavingAccountForm.value.balanceInitial

    // @ts-ignore
    this.service.newSavingAccount(sa,id).subscribe(value => {
      this.savingAccount=value
    })
  }

  newCurrentAccount() {
    let id=this.route.snapshot.paramMap.get("id")
    let ca=new CurrentAccount();
    ca.currency=this.newCurrentAccountForm.value.currency
    ca.balance=this.newCurrentAccountForm.value.balanceInitial
    ca.overDraft=this.newCurrentAccountForm.value.overDraft
    // @ts-ignore
    this.service.newCurrentAccount(ca,id).subscribe({})
  }
}
