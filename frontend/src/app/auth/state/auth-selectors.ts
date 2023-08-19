import { createSelector, createFeatureSelector } from '@ngrx/store';
import {AuthState} from "./auth-reducers";

export const selectAuthState = createFeatureSelector<AuthState>('AuthState')

export const selectError = () => createSelector(
  selectAuthState,
  (state: AuthState) => state.error
)

