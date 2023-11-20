import {Account} from "./Account.model";
import {AccountType} from "./AccountType.model";

export class CurrentAccount extends Account{
  overDraft!:number;
  type!:AccountType;
}
