import {Account} from "./Account.model";
import {AccountType} from "./AccountType.model";

export interface CurrentAccount extends Account{
  overDraft:number;
  type:AccountType;
}
