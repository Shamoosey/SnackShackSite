import { Action, createReducer, on } from "@ngrx/store";
import * as ShackActions from "./shack.actions"
import { Account } from "../models/Account";
import { ExchangeRate } from "../models/ExchangeRate";
import { User } from "../models/User";
import { AccountHistory } from "../models/AccountHistory";

export const SHACK_FEATURE_KEY = "shack"

export interface ShackState {
  currentUser: User | null,
  userAccounts: Account[],
  selectedAccount: Account | null;
  exchangeRates: ExchangeRate[],
  accountHistory: AccountHistory[]
}

const initialState: ShackState = {
  currentUser: null,
  userAccounts: [],
  selectedAccount: null,
  exchangeRates: [],
  accountHistory: []
};

export const shackReducer = createReducer(
  initialState,
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
  }),
  on(ShackActions.GetUserAccountHistorySuccess, (state, { accounts }) => {
    return {
      ...state,
      accountHistory: accounts
    }
  })
)

export function reducer(state: ShackState | undefined, action: Action) {
  return shackReducer(state, action);

}