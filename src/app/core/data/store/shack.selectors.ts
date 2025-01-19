import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SHACK_FEATURE_KEY, shackReducer, ShackState } from './shack.reducer';

export const shackFeature = createFeatureSelector<ShackState>(SHACK_FEATURE_KEY)

export const getAuthToken = createSelector(shackFeature, state => state.authToken)