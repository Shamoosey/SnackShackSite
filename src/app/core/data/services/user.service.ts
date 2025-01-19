import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models";
import { environment } from "../../../../environments/environment";

@Injectable()
export class UserService {
  constructor(
    private http:HttpClient
  ) {}

  getUsers(configId: string):Observable<User[]> {
    return this.http.get<User[]>(`${environment.configurationServiceUrl}/User/GetAll?configId=${configId}`)
  }
}