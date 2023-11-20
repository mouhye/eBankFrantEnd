import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable} from "rxjs";
import {Customer} from "../model/Customer.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
 // template: '<app-list-account [cus]="custo" ></app-list-account>',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  customers!:Observable<Array<Customer>>;
  errorMessage!:Error;
  searchFormGroup!:FormGroup;
  @Output()
  customerEvent=new EventEmitter<Customer>();
  constructor(private customerService:CustomerService,private fb:FormBuilder,private router:Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      name:this.fb.control("",[Validators.required,Validators.minLength(1)])
    })
    // @ts-ignore
    this.customers = this.customerService.getCustomers().pipe(
      catchError(err =>{
        return this.errorMessage = err;
      })
    );
  }

  handleSearchCustomers() {
    let sName=this.searchFormGroup?.value.name;
    // @ts-ignore
    this.customers = this.customerService.searchCustomers(sName).pipe(
      catchError(err =>{
        return this.errorMessage = err;
      })
    );
  }

  deleteCustomer(cus: Customer) {
    let c=confirm("Are you sure !")
    if(!c)return;
    this.customerService.deleteCustomer(cus).subscribe({
      next:() => {
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(cus);
            data.slice(index,1);
            return data;
          })
        )
        },error:err => {alert(err)}
    })

  }

  toListAccount(cus: Customer) {
    this.router.navigate(["/list-accounts",cus]).then(r => {})
  }
}

