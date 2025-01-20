import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Account } from "../models/Account";
import { UpdateAccountRequest } from "../models/UpdateAccountRequest";
import { UpdateAccountInfoRequest } from "../models";

@Injectable()
export class AccountService {
  constructor(
    private http:HttpClient
  ) {}

  getUserAccounts(userId: string){
    return this.http.get<Account[]>(`${environment.apiUrl}/api/account/GetByUserGetByUser/${userId}`)
  }

  updateAccountInfo(accountId: string, data: UpdateAccountInfoRequest){
    return this.http.put<boolean>(`${environment.apiUrl}/api/account/UpdateAccountInfo/${accountId}`, data)
  }

  updateAccountBalance(request: UpdateAccountRequest){
    return this.http.post<boolean>(`${environment.apiUrl}/api/account/UpdateAccountBalance`, request)
  }
}