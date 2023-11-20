import {Status} from "./Status.model";
import {Customer} from "./Customer.model";
import {Currency} from "./Currency.model";

export class Account{
  id!:           string;
  balance!:      number;
  createdAt!:    Date;
  status!:       Status;
  customerDTO!:  Customer;
  currency!:     Currency;
}
