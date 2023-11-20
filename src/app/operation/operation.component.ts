import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {AccountHistory} from "../model/AccountHistory";
import {Operation} from "../model/Operation.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit{
  accountHistory!:AccountHistory
  operations!:Operation[]
  id!:string | null
  size=''
  page=0
  constructor(private service:AccountService,private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get("id")
    this.getHistory()
  }

  getHistory(page:number=0,size:number=5){
    // @ts-ignore
    this.service.getAccountHistory(this.id,page,size).subscribe(value => {
      this.accountHistory=value
      this.operations=value.operationDTOList
    })
  }

  getPage(i: number) {
    this.page=i
// @ts-ignore
    this.getHistory(i,this.size)
  }

  selectSize(value: string) {
    this.size=value;
    // @ts-ignore
    this.getHistory(0,value)
  }
}
