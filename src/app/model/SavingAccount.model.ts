import {Account} from "./Account.model";
import {AccountType} from "./AccountType.model";

export class SavingAccount extends Account{
  interestRate!:number
  type!:AccountType
}
