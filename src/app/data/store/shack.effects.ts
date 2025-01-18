import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, withLatestFrom, of, switchMap, concatMap, mergeMap} from "rxjs";
import { Store, select } from "@ngrx/store";
import { ShackState } from "./shack.reducer";
import { UserService } from "../services";

@Injectable()
export class ShackEffects {
  private readonly SNACK_BAR_DURATION = 5000; 

  constructor(
    private store: Store<ShackState>,
    private actions$: Actions,
    private userService: UserService,

  ) {}

}