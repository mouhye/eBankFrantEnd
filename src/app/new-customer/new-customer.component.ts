import {Component, OnInit} from '@angular/core';
import {Customer} from "../model/Customer.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{
  newCustomer!:Customer;
  newCustomerForm!: FormGroup;
  constructor(private fb:FormBuilder,private service:CustomerService,private router:Router) {
  }

  addCustomer() {

    this.newCustomer=this.newCustomerForm.value;
    this.service.addCustomer(this.newCustomer).subscribe({
      next: value => {
        alert("customer saved success with id: "+value.id)
        this.newCustomerForm.reset();
        this.router.navigateByUrl("/customers").then(r => {})
      }
    })
  }

  ngOnInit(): void {
    this.newCustomerForm=this.fb.group({
      firstName:this.fb.control(null,[Validators.required,Validators.minLength(3)]),
      lastName:this.fb.control(null,[Validators.required,Validators.minLength(3)]),
      email:this.fb.control(null,[Validators.required,Validators.email])
    })
  }

  cancel() {
    this.newCustomerForm.reset();
    this.router.navigateByUrl("/customers").then(r => {})
  }
}
