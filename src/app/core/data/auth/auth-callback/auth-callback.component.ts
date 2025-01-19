import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ShackState } from '../../store/shack.reducer';
import * as ShackActions from "../../store/shack.actions";

@Component({
  selector: 'app-auth-callback',
  template: '<p>Redirecting...</p>',
  standalone: false
})
export class AuthCallbackComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<ShackState>
    ) {}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const code = params['code'];
        if (code) {
          this.store.dispatch(ShackActions.AutenticateUser({code}))
        } else {
          this.router.navigate(['/']); 
        }
      });
    }
}
