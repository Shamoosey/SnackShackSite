import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShackState } from '../../store/shack.reducer';
import * as ShackActions from "../../store/shack.actions";
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginComponent implements OnInit {
    constructor(
      private store: Store<ShackState>,
      private router: Router
    ) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken'); 
    if(accessToken){
      this.router.navigate(["/"])
    } 
  }

    onLogin(): void {
      this.store.dispatch(ShackActions.LoginUser())
    }
}
