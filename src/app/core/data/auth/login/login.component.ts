import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShackState } from '../../store/shack.reducer';
import * as ShackActions from "../../store/shack.actions";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginComponent {
    constructor(
      private store: Store<ShackState>
    ) {}

    onLogin(): void {
      this.store.dispatch(ShackActions.LoginUser())
    }
}
