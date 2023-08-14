import {createReducer, on} from "@ngrx/store";
import {PostActions} from "../../post/state/post-actions";

export interface ErrorState {
  error: string;
}

export const initialState: ErrorState = {
  error: '',
}

export const ErrorReducer = createReducer(
  initialState,
  on(PostActions.getPostListFailure, (state, { error}) => {
    console.log(error);
    return {...state,error: error};
  }),
  on(PostActions.createPostFailure, (state, { error}) => {
    console.log(error);
    return {...state,error: error};
  }),
  on(PostActions.updatePostFailure, (state, { error}) => {
    console.log(error);
    return {...state,error: error};
  }),
  on(PostActions.deletePostFailure, (state, { error}) => {
    console.log(error);
    return {...state,error: error};
  }),
);
