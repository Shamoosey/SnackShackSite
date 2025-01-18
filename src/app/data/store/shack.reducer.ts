import { Action, createReducer, on } from "@ngrx/store";
import * as shackActions from "./shack.actions"

export const SHACK_FEATURE_KEY = "shack"

export interface ShackState {
}

const initialState: ShackState = {
};

export const shackReducer = createReducer(
  initialState,
)

export function reducer(state: ShackState | undefined, action: Action) {
  return shackReducer(state, action);
}