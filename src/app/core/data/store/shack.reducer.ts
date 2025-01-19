import { Action, createReducer, on } from "@ngrx/store";
import * as ShackActions from "./shack.actions"

export const SHACK_FEATURE_KEY = "shack"

export interface ShackState {
  isAuthenticated: boolean,
  authToken: string | null
}

const initialState: ShackState = {
  isAuthenticated: false,
  authToken: null
};

export const shackReducer = createReducer(
  initialState,
  on(ShackActions.AutenticateUserSuccess, (state, { token }) => {
    return {
      ...state,
      authToken: token
    }
  }),
  on(ShackActions.RefreshTokenSuccess, (state, { token }) => {
    return {
      ...state,
      authToken: token
    }
  })
)

export function reducer(state: ShackState | undefined, action: Action) {
  return shackReducer(state, action);

}