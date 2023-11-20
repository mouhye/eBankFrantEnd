import {Account} from "./Account.model";
import {OperationType} from "./OperationType.model";

export interface Operation {
    id:            number;
    operationDate: Date;
    mount:         number;
    type:          OperationType;
    accountDTO:    Account;
    description:   string;
}
