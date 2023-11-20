import {OperationType} from "./OperationType.model";

export class DebitRequest {
    public accountId!:     string;
   public mountDebit!:    number;
   public description!:   string;
   public operationType!:OperationType.DEBIT;

}
