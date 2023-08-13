import {createReducer, on} from "@ngrx/store";
import {Post} from "../models/post.interface";
import {PostActions} from "./post-actions";

export interface Process {
  loading : boolean ;
  error : string | null;
}

const defaultProcess : Process = {loading: false, error: null};

export interface PostState {
  posts: ReadonlyArray<Post>;
  selected : Post | null;
  getProcess : Process;
  deleteProcess : Process;
}

export const initialState: PostState = {
  posts: [],
  selected : null,
  getProcess: defaultProcess,
  deleteProcess: defaultProcess,
}

export const PostReducer = createReducer(
  initialState,
  on(PostActions.getPostList, (state) => {
    return {...state, getProcess: {loading: true, error: null}}}),
  on(PostActions.getPostListSuccess, (state, { posts }) => {
    return {...state, posts, getProcess: {loading: false, error: null}}}),
  on(PostActions.getPostListFailure, (state, { error }) => {
    return {...state, getProcess:{loading:false, error}}}),
  on(PostActions.deletePost, (state, {post}) => {
    return {...state, selected:post, deleteProcess: {loading: true, error: null}}}),
  on(PostActions.deletePostSuccess, (state, { postId }) =>
    { return {...state, selected:null ,posts: state.posts.filter(x=> x.id!= postId), deleteProcess: {loading: false, error: null}}}),
  on(PostActions.deletePostFailure, (state, { error }) => {
    return {...state, selected:null, deleteProcess:{loading:false, error}}}),

);
