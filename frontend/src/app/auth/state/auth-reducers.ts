import {createReducer, on} from "@ngrx/store";
import {AuthActions} from "./auth-actions";

export interface AuthState {
  token: string;
  error: string | null;
}

export const initialState: AuthState = {
  token: "",
  error: null,
}

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.setToken, (state, {token}) => {
    return {...state, token}}),
  on(AuthActions.authError, (state, { error }) => {
    return {...state, error}}),
);
