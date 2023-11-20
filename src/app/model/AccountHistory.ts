import {Operation} from "./Operation.model";

export interface AccountHistory{
    accountId:        string;
    balance:          number;
    currentPage:      number;
    totalPages:       number;
    size:             number;
    operationDTOList: Operation[];
}
