import {createReducer, on} from "@ngrx/store";
import {PostActions} from "../../post/state/post-actions";
import {AuthActions} from "../../auth/state/auth-actions";

export interface ErrorState {
  error: string;
}

export const initialState: ErrorState = {
  error: '',
}

export const ErrorReducer = createReducer(
  initialState,
  on(PostActions.getPostListFailure, (state, { error}) => {
    return {...state,error: error};
  }),
  on(PostActions.createPostFailure, (state, { error}) => {
    return {...state,error: error};
  }),
  on(PostActions.updatePostFailure, (state, { error}) => {
    return {...state,error: error};
  }),
  on(PostActions.deletePostFailure, (state, { error}) => {
    return {...state,error: error};
  }),
  on(AuthActions.authError, (state, { error}) => {
    return {...state,error: error};
  }),
);
