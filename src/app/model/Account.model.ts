import {Status} from "./Status.model";
import {Customer} from "./Customer.model";
import {Currency} from "./Currency.model";

export interface Account{
  id:           string;
  balance:      number;
  createdAt:    Date;
  status:       string;
  customerDTO:  Customer;
  currency:     Currency;
}
