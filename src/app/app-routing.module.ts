import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {ListAccountComponent} from "./list-account/list-account.component";
import {OperationComponent} from "./operation/operation.component";
import {TransactionComponent} from "./transaction/transaction.component";

const routes: Routes = [
  { path:"customers",component:CustomersComponent },
  { path:"accounts",component:AccountsComponent },
  { path:"new-customer",component:NewCustomerComponent},
  { path:"list-accounts",component:ListAccountComponent},
  { path:"operation",component:OperationComponent},
  { path:"transaction",component:TransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
