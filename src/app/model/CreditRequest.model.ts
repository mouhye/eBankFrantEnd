import {OperationType} from "./OperationType.model";

export class CreditRequest {
    accountId!:     string;
    mountCredit!:   number;
    description!:   string;
    operationType!: OperationType.CREDIT;
}
