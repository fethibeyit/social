import {createReducer, on} from "@ngrx/store";
import {ErrorActions} from "./error-actions";
import {PostActions} from "../../post/state/post-actions";

export interface ErrorState {
  error: string;
}

export const initialState: ErrorState = {
  error: '',
}

export const ErrorReducer = createReducer(
  initialState,
  on(PostActions.deletePostFailure, (state, { error}) => {
    console.log(error);
    return {...state,error: error};
  }),
);
