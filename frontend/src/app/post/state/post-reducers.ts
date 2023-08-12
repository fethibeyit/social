import {createReducer, on} from "@ngrx/store";
import {Post} from "../models/post.interface";
import {setPostList} from "./post-actions";

export interface PostState {
  Posts: ReadonlyArray<Post>;
}

export const initialState: PostState = {
  Posts: []
}

export const PostReducer = createReducer(
  initialState,
  on(setPostList, (state, { Posts }) => { return {...state, Posts}}),

);
