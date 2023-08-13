import {createReducer, on} from "@ngrx/store";
import {Post} from "../models/post.interface";
import {PostActions} from "./post-actions";

export interface PostState {
  posts: ReadonlyArray<Post>;
  loading : boolean;
  error : string;
}

export const initialState: PostState = {
  posts: [],
  loading : false,
  error : '',
}

export const PostReducer = createReducer(
  initialState,
  on(PostActions.getPostList, (state) => { return {...state, loading:true}}),
  on(PostActions.getPostListSuccess, (state, { posts }) => { return {...state, posts, loading:false}}),
  on(PostActions.getPostListFailure, (state, { error }) => { return {...state, error, loading:false}}),

);
