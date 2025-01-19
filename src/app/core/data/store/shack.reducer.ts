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
    localStorage.setItem('accessToken', token)
    return {
      ...state,
      authToken: token
    }
  }),
  on(ShackActions.RefreshTokenSuccess, (state, { token }) => {
    localStorage.setItem('accessToken', token)
    return {
      ...state,
      authToken: token
    }
  }),
  on(ShackActions.LogoutUser, (state) => {
    localStorage.removeItem('accessToken')
    return {
      ...state,
      isAuthenticated: false,
      authToken: null
    }
  })
)

export function reducer(state: ShackState | undefined, action: Action) {
  return shackReducer(state, action);

}