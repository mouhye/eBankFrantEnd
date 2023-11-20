import {Component , OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {SavingAccount} from "../model/SavingAccount.model";
import {CurrentAccount} from "../model/CurrentAccount.model";
import {Customer} from "../model/Customer.model";
import {AccountType} from "../model/AccountType.model";
import {ActivatedRoute, Router} from "@angular/router";
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
  constructor(private service:AccountService,private route: ActivatedRoute,private router:Router) {
  }
  ngOnInit(): void {

   let id=this.route.snapshot.paramMap.get("id")
    // @ts-ignore
    this.getListAccount(id);
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

  protected readonly AccountType = AccountType;

  listOperation(acc: SavingAccount & CurrentAccount) {
    this.router.navigate(["/operation",acc]).then(r => {})

  }
}
