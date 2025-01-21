import { Action, createReducer, on } from "@ngrx/store";
import * as ShackActions from "./shack.actions"
import { User } from "../models";
import { Account } from "../models/Account";
import { ExchangeRate } from "../models/ExchangeRate";

export const SHACK_FEATURE_KEY = "shack"

export interface ShackState {
  isAuthenticated: boolean,
  currentUser: User | null,
  authToken: string | null
  userAccounts: Account[],
  selectedAccount: Account | null;
  exchangeRates: ExchangeRate[],
  isRefreshingToken: boolean;
}

const initialState: ShackState = {
  currentUser: null,
  isAuthenticated: false,
  authToken: null,
  userAccounts: [],
  selectedAccount: null,
  exchangeRates: [],
  isRefreshingToken: false
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

  on(ShackActions.SetRefreshingToken, (state, { value }) => {
    return {
      ...state,
      isRefreshingToken: value
    }
  }),
  on(ShackActions.RefreshTokenSuccess, (state, { token }) => {
    localStorage.setItem('accessToken', token)
    return {
      ...state,
      authToken: token,
      isRefreshingToken: false
    }
  }),
  on(ShackActions.LogoutUser, (state) => {
    localStorage.removeItem('accessToken')
    return {
      ...initialState
    }
  }),
  on(ShackActions.GetExchangeRates, (state) => {
    return {
      ...state
    }
  }),
  on(ShackActions.GetExchangeRatesSuccess, (state, { result }) => {
    return {
      ...state,
      exchangeRates: result
    }
  }),
  on(ShackActions.GetCurrentUserSuccess, (state, { user }) => {
    return {
      ...state,
      currentUser: user
    }
  }),
  on(ShackActions.GetUserAccounts, (state) => {
    return {
      ...state,
      userAccounts: [],
    }
  }),
  on(ShackActions.GetUserAccountsSuccess, (state, { accounts }) => {
    return {
      ...state,
      userAccounts: accounts,
      selectedAccount: accounts.find(x => x.accountId == state.selectedAccount?.accountId) ?? null
    }
  }),
  on(ShackActions.SelectedAccountChange, (state, { accountId }) => {
    const account = state.userAccounts.find(x => x.accountId == accountId);
    return {
      ...state,
      selectedAccount: account ?? null
    }
  })
)

export function reducer(state: ShackState | undefined, action: Action) {
  return shackReducer(state, action);

}