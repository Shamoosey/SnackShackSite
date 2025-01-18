import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SHACK_FEATURE_KEY, shackReducer, ShackState } from './shack.reducer';

export const configurationFeature = createFeatureSelector<ShackState>(SHACK_FEATURE_KEY)
