import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SHACK_FEATURE_KEY, shackReducer, ShackState } from './shack.reducer';

export const shackFeature = createFeatureSelector<ShackState>(SHACK_FEATURE_KEY)

export const getCurrentUser = createSelector(shackFeature, state => state.currentUser)
export const getUserAccounts = createSelector(shackFeature, state => state.userAccounts)
export const getSelectedAccount = createSelector(shackFeature, state => state.selectedAccount);
export const getExchangeRates = createSelector(shackFeature, state => state.exchangeRates);