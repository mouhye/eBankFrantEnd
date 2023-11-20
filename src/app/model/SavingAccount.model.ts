import {Account} from "./Account.model";
import {AccountType} from "./AccountType.model";

export interface SavingAccount extends Account{
  interestRate:number
  type:AccountType
}
