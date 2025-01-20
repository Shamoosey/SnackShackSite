import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Account } from "../models/Account";
import { UpdateAccountRequest } from "../models/UpdateAccountRequest";

@Injectable()
export class AccountService {
  constructor(
    private http:HttpClient
  ) {}

  getUserAccounts(userId: string){
    return this.http.get<Account[]>(`${environment.apiUrl}/api/account/${userId}`)
  }

  updateAccountBalance(request: UpdateAccountRequest){
    console.log(request)
    return this.http.post<boolean>(`${environment.apiUrl}/api/account/updateaccountbalance`, request)
  }
}