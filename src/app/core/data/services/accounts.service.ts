import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Account } from "../models/Account";
import { UpdateAccountRequest } from "../models/UpdateAccountRequest";
import { TransferAccountRequest } from "../models/TransferAccountRequest";
import { AccountHistory } from "../models/AccountHistory";

@Injectable()
export class AccountService {
  constructor(
    private http:HttpClient
  ) {}

  getUserAccounts(){
    return this.http.get<Account[]>(`${environment.apiUrl}/api/account/GetByUser`)
  }

  updateAccountBalance(request: UpdateAccountRequest){
    return this.http.post<boolean>(`${environment.apiUrl}/api/account/UpdateAccountBalance`, request)
  }

  transferFunds(request: TransferAccountRequest){
    return this.http.put<boolean>(`${environment.apiUrl}/api/account/TransferFunds`, request)
  }

  getUserAccountHistory(accountId: string){
    return this.http.get<AccountHistory[]>(`${environment.apiUrl}/api/account/GetAccountHistory/${accountId}`)
  }
}