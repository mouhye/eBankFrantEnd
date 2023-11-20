import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ListAccountComponent } from './list-account/list-account.component';
import { OperationComponent } from './operation/operation.component';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    AccountsComponent,
    NewCustomerComponent,
    ListAccountComponent,
    OperationComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
